import { siteAlt, siteImg } from '$lib/config';
import { render } from 'svelte/server';
import { blogYears, getAllTopics } from './api';

export const fetchLab = async ({ topics = '', byURL = '' } = {}) => {
	const labs = await Promise.all(
		Object.entries(import.meta.glob('$lib/content/lab/*.svx')).map(async ([path, resolver]) => {
			const { metadata, default: content } = await resolver();
			const slug = path.split('/').pop().slice(0, -4);

			let labText = '';

			if (content) {
				const labContent = render(content);
				// Strip HTML tags, remove \n line breaks, to lowercase
				labText =
					labContent?.body
						?.replace(/<[^>]*>?/gm, '')
						.replace(/\r?\n|\r/g, ' ')
						.toLowerCase() || '';
			}

			return { ...metadata, slug, labText };
		})
	);

	let sortedLabs = labs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

	//  TODO: topic handling
	// ?maybe?
	if (topics) {
		sortedLabs = sortedLabs.filter((s) => {
			topics.forEach((t) => s.topics.includes(t));
		});
		// console.log(sortedSnips, 'by topic');
	}

	if (byURL) {
		sortedLabs = sortedLabs.filter((s) => s.slug === byURL);
	}

	let allTopics = [];
	let pinned = [];
	let byYear = [];
	let searchStrs = [];
	// year slots
	for (let y = 0; y < blogYears; y++) {
		byYear.push([]);
	}

	sortedLabs = sortedLabs.map((s) => {
		if (s.pinned) {
			pinned.push({
				title: s.title,
				slug: s.slug,
				created_at: s.created_at,
				excerpt: s.excerpt,
				topics: s.topics ?? [],
				pinned: s.pinned ?? false,
				seo_type: s.seo_type ?? 'article'
			});
		}

		if (s.topics) {
			allTopics.push({ lab_slug: s.slug, topics: s.topics });
		}

		if (s.snipText) {
			searchStrs.push({
				slug: s.slug,
				content: `${s.title.toLowerCase()} ${s.excerpt.toLowerCase()} ${s.snipText}`
			});
		}

		for (let i = 1; i <= blogYears; i++) {
			let currYr = 2025 + i;
			if (s.created_at.includes(currYr)) {
				byYear[i].push({
					title: s.title,
					slug: s.slug,
					created_at: s.created_at,
					excerpt: s.excerpt,
					topics: s.topics ?? [],
					pinned: s.pinned ?? false
				});
			}
		}

		return {
			title: s.title,
			slug: s.slug,
			created_at: s.created_at,
			excerpt: s.excerpt,
			topics: s.topics ?? [],
			pinned: s.pinned ?? false,
			cover_img: s.cover_img ?? siteImg,
			cover_alt: s.cover_alt ?? siteAlt,
			seo_type: s.seo_type ?? 'article'
		};
	});

	// console.log(searchStrs);

	return {
		labs: sortedLabs,
		searchStrs,
		topics: getAllTopics(allTopics),
		byYear: byYear.reverse(),
		pinned
	};
};
