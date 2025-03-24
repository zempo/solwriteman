import { fetchLab } from '$lib/components/content/helpers/lab';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const { labs, byYear, searchStrs, pinned, topics } = await fetchLab();

	return json({
		labs,
		byYear,
		searchStrs,
		pinned,
		topics
	});
};
