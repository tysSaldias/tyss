import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
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

export const GET: RequestHandler = async ({ params, locals }) => {
	// Feature flag check
	if (PUBLIC_REVIEWS_ENABLED !== 'true') {
		throw error(404, 'Feature not enabled');
	}

	const { productId } = params;
	if (!productId) {
		throw error(400, 'Missing productId parameter');
	}

	const supabase = locals.supabase;

	// Fetch reviews for the product
	const { data: reviews, error: fetchError } = await supabase
		.from('reviews')
		.select('*')
		.eq('product_id', productId)
		.order('created_at', { ascending: false });

	if (fetchError) {
		console.error('Error fetching reviews:', fetchError);
		throw error(500, 'Failed to fetch reviews');
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

		return json({ reviews: enrichedReviews, stats: productStats });
	}

	return json({ reviews: reviews ?? [], stats: productStats });
};

export const POST: RequestHandler = async ({ params, request, locals }) => {
	// Feature flag check
	if (PUBLIC_REVIEWS_ENABLED !== 'true') {
		throw error(404, 'Feature not enabled');
	}

	const { productId } = params;
	if (!productId) {
		throw error(400, 'Missing productId parameter');
	}

	// Check authentication
	const session = locals.session;
	if (!session) {
		throw error(401, 'Authentication required');
	}

	const body = await request.json();
	const { rating, comment } = body;

	// Validate rating
	if (typeof rating !== 'number' || rating < 1 || rating > 5) {
		throw error(400, 'Rating must be between 1 and 5');
	}

	// Validate comment length
	if (comment && comment.length > 1000) {
		throw error(400, 'Comment cannot exceed 1000 characters');
	}

	const supabase = locals.supabase;
	const user_id = session.user.id;

	// Check if user already has a review for this product
	const { data: existingReview, error: existingError } = await supabase
		.from('reviews')
		.select('id')
		.eq('user_id', user_id)
		.eq('product_id', productId)
		.single();

	if (existingError && existingError.code !== 'PGRST116') {
		// PGRST116 is "not found" which is fine
		console.error('Error checking existing review:', existingError);
		throw error(500, 'Failed to check existing review');
	}

	if (existingReview) {
		// Update existing review
		const { data: updatedReview, error: updateError } = await supabase
			.from('reviews')
			.update({ rating, comment: comment ?? '' })
			.eq('id', existingReview.id)
			.select()
			.single();

		if (updateError) {
			console.error('Error updating review:', updateError);
			throw error(500, 'Failed to update review');
		}

		return json({ review: updatedReview });
	} else {
		// Insert new review
		const { data: newReview, error: insertError } = await supabase
			.from('reviews')
			.insert({
				user_id,
				product_id: productId,
				rating,
				comment: comment ?? ''
			})
			.select()
			.single();

		if (insertError) {
			console.error('Error inserting review:', insertError);
			if (insertError.code === '23505') {
				// Unique constraint violation (race condition)
				throw error(409, 'Review already exists');
			}
			throw error(500, 'Failed to create review');
		}

		return json({ review: newReview }, { status: 201 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	// Feature flag check
	if (PUBLIC_REVIEWS_ENABLED !== 'true') {
		throw error(404, 'Feature not enabled');
	}

	const { productId } = params;
	if (!productId) {
		throw error(400, 'Missing productId parameter');
	}

	// Check authentication
	const session = locals.session;
	if (!session) {
		throw error(401, 'Authentication required');
	}

	const supabase = locals.supabase;
	const user_id = session.user.id;

	// Delete review (RLS ensures user can only delete their own)
	const { error: deleteError } = await supabase
		.from('reviews')
		.delete()
		.eq('user_id', user_id)
		.eq('product_id', productId);

	if (deleteError) {
		console.error('Error deleting review:', deleteError);
		throw error(500, 'Failed to delete review');
	}

	return new Response(null, { status: 204 });
};