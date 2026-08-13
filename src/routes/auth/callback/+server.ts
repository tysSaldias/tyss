import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, request }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const supabase = createServerClient(
			import.meta.env.PUBLIC_SUPABASE_URL,
			import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					getAll() {
						return parseCookieHeader(request.headers.get('Cookie') ?? '');
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value, options }) => {
							cookies.set(name, value, { path: '/', ...options });
						});
					}
				}
			}
		);

		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, next);
		}
	}

	// Return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};