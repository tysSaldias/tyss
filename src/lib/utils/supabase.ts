import { createClient } from '@supabase/supabase-js';
import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

export function createBrowserClient() {
	return createSupabaseBrowserClient(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY
	);
}

export function createServerClient(cookies: {
	get: (name: string) => string | undefined;
	set: (name: string, value: string, options: Record<string, unknown>) => void;
}) {
	return createClient(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
		{
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				// Use cookies for session management
				storage: {
					getItem: async (key: string) => {
						return cookies.get(key) ?? null;
					},
					setItem: async (key: string, value: string) => {
						cookies.set(key, value, {
							path: '/',
							httpOnly: true,
							secure: import.meta.env.PROD,
							sameSite: 'lax',
							maxAge: 60 * 60 * 24 * 7 // 1 week
						});
					},
					removeItem: async (key: string) => {
						cookies.set(key, '', {
							path: '/',
							maxAge: 0
						});
					}
				}
			}
		}
	);
}

// Admin client with service role key (server only)
export function createAdminClient() {
	return createClient(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false
			}
		}
	);
}