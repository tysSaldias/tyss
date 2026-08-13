import { createBrowserClient } from '$lib/utils/supabase';
import type { User, Session } from '@supabase/supabase-js';

// Lazy initialization - only create client in browser
let supabase: ReturnType<typeof createBrowserClient> | null = null;

function getSupabase() {
	if (!supabase && typeof window !== 'undefined') {
		supabase = createBrowserClient();
	}
	return supabase;
}

// Auth state using Svelte 5 runes
let user = $state<User | null>(null);
let session = $state<Session | null>(null);
let isLoading = $state(true);
let initialized = false;

// Initialize auth state from current session
async function initializeAuth() {
	if (initialized) return;
	const client = getSupabase();
	if (!client) {
		isLoading = false;
		return;
	}
	
	try {
		const { data: { session: currentSession } } = await client.auth.getSession();
		session = currentSession;
		user = currentSession?.user ?? null;
	} catch (error) {
		console.error('Error initializing auth:', error);
	} finally {
		isLoading = false;
		initialized = true;
	}
}

// Listen for auth changes (only in browser)
if (typeof window !== 'undefined') {
	// Defer initialization to after module load
	setTimeout(() => {
		const client = getSupabase();
		if (client) {
			client.auth.onAuthStateChange((_event, currentSession) => {
				session = currentSession;
				user = currentSession?.user ?? null;
			});
			initializeAuth();
		}
	}, 0);
}

export function getAuthState() {
	return {
		get user() { return user; },
		get session() { return session; },
		get isLoading() { return isLoading; },
		get isAuthenticated() { return !!user; }
	};
}

export async function signInWithGoogle() {
	const client = getSupabase();
	if (!client) throw new Error('Supabase not initialized');
	
	try {
		const { error } = await client.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
		if (error) throw error;
	} catch (error) {
		console.error('Error signing in with Google:', error);
		throw error;
	}
}

export async function signOut() {
	const client = getSupabase();
	if (!client) throw new Error('Supabase not initialized');
	
	try {
		const { error } = await client.auth.signOut();
		if (error) throw error;
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
}