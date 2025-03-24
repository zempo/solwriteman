import { fetchLab } from '$lib/components/content/helpers/lab';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const { labs, searchLab, pinnedLab, topicsLab } = await fetchLab();

	return json({
		labs,
		searchLab,
		pinnedLab,
		topicsLab
	});
};
