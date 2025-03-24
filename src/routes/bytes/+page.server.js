import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	try {
		const labRes = await fetch(`${url.origin}/api/lab.json`);
		const labData = await labRes.json();
		const { labs, byYear, searchStrs, pinned, topics } = labData;

		return {
			labs,
			byYear,
			searchStrs,
			pinned,
			topics,
			count: labs.length ?? 0
		};
	} catch (err) {
		console.log(err);
	}
}
