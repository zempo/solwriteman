// import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	try {
		const labRes = await fetch(`${url.origin}/api/lab.json`);
		const kitRes = await fetch(`${url.origin}/api/kit.json`);
		const labData = await labRes.json();
		const kitData = await kitRes.json();
		const { labs, searchLab, pinnedLab, topicsLab } = labData;
		const { kits, searchKit, pinnedKit, topicsKit } = kitData;

		return {
			labs,
			searchLab,
			pinnedLab,
			topicsLab,
			countLab: labs.length ?? 0,
			kits,
			searchKit,
			pinnedKit,
			topicsKit,
			countKit: kits.length ?? 0
		};
	} catch (err) {
		console.log(err);
	}
}
