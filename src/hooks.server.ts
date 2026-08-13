import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Create a Supabase client configured to use cookies
	const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

	// During prerender/build, environment variables may not be set
	if (!supabaseUrl || !supabaseAnonKey) {
		event.locals.supabase = null;
		event.locals.session = null;
		const response = await resolve(event);
		return response;
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(event.request.headers.get('Cookie') ?? '');
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { path: '/', ...options });
				});
			}
		}
	});

	// For Supabase Auth, we need to refresh the session on each request.
	// This ensures the session is valid and tokens are refreshed if needed.
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Attach supabase client and session to event.locals for use in routes
	event.locals.supabase = supabase;
	event.locals.session = session;

	// Resolve the request and get the response
	const response = await resolve(event);

	// Add cache control headers to prevent CDN from caching authenticated responses
	response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

	return response;
};