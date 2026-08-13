import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { createAdminClient } from '$lib/utils/supabase-admin';
import { PUBLIC_REVIEWS_ENABLED } from '$env/static/public';

// Helper to fetch user metadata (display name, avatar) for a list of user IDs
async function fetchUserMetadata(userIds: string[]): Promise<Record<string, { name: string; avatar: string }>> {
	if (userIds.length === 0) return {};

	const admin = createAdminClient();
	const metadata: Record<string, { name: string; avatar: string }> = {};

	// Fetch users in batches (Supabase admin API limited to 1000)
	for (let i = 0; i < userIds.length; i += 100) {
		const batch = userIds.slice(i, i + 100);
		const { data, error: fetchError } = await admin.auth.admin.listUsers({
			perPage: 100,
			page: Math.floor(i / 100) + 1
		});

		if (fetchError) {
			console.error('Error fetching user metadata:', fetchError);
			continue;
		}

		for (const user of data.users) {
			if (batch.includes(user.id)) {
				metadata[user.id] = {
					name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'Usuario',
					avatar: user.user_metadata?.avatar_url ?? ''
				};
			}
		}
	}

	return metadata;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	// Feature flag check
	if (PUBLIC_REVIEWS_ENABLED !== 'true') {
		return {
			reviews: [],
			stats: {
				product_id: params.slug,
				average_rating: 0,
				review_count: 0
			}
		};
	}

	const supabase = locals.supabase;
	const productId = params.slug;

	// Fetch reviews for the product
	const { data: reviews, error: fetchError } = await supabase
		.from('reviews')
		.select('*')
		.eq('product_id', productId)
		.order('created_at', { ascending: false });

	if (fetchError) {
		console.error('Error fetching reviews:', fetchError);
		// Don't throw, just return empty reviews
	}

	// Fetch product stats from view
	const { data: stats, error: statsError } = await supabase
		.from('product_stats')
		.select('*')
		.eq('product_id', productId)
		.single();

	// If stats not found, return empty stats
	const productStats = stats ?? {
		product_id: productId,
		average_rating: 0,
		review_count: 0
	};

	// Enrich reviews with user metadata
	if (reviews && reviews.length > 0) {
		const userIds = [...new Set(reviews.map(r => r.user_id))];
		const userMetadata = await fetchUserMetadata(userIds);

		const enrichedReviews = reviews.map(review => ({
			...review,
			user_name: userMetadata[review.user_id]?.name ?? 'Usuario',
			user_avatar: userMetadata[review.user_id]?.avatar ?? ''
		}));

		return {
			reviews: enrichedReviews,
			stats: productStats
		};
	}

	return {
		reviews: reviews ?? [],
		stats: productStats
	};
};