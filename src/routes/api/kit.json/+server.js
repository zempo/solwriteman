import { fetchKit } from '$lib/components/content/helpers/kit';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const { kits, searchKit, pinnedKit, topicsKit } = await fetchKit();

	return json({
		kits,
		searchKit,
		pinnedKit,
		topicsKit
	});
};
