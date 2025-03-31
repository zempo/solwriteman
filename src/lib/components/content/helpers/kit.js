import { siteAlt, siteImg } from '$lib/config';
import { render } from 'svelte/server';
import { getAllTopics } from './api';

export const fetchKit = async ({ topics = '', byURL = '' } = {}) => {
	const kits = await Promise.all(
		Object.entries(import.meta.glob('$lib/components/content/kit/*.svx')).map(
			async ([path, resolver]) => {
				const { metadata, default: content } = await resolver();
				const slug = path.split('/').pop().slice(0, -4);

				let kitText = '';

				if (content) {
					const kitContent = render(content);
					// Strip HTML tags, remove \n line breaks, to lowercase
					kitText =
						kitContent?.body
							?.replace(/<[^>]*>?/gm, '')
							.replace(/\r?\n|\r/g, ' ')
							.toLowerCase() || '';
				}

				return { ...metadata, slug, kitText };
			}
		)
	);

	let sortedKit = kits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

	//  TODO: topic handling
	// ?maybe?
	if (topics) {
		sortedKit = sortedKit.filter((s) => {
			topics.forEach((t) => s.topics.includes(t));
		});
	}

	if (byURL) {
		sortedKit = sortedKit.filter((s) => s.slug === byURL);
	}

	let allTopics = [];
	let pinnedKit = [];
	let searchKit = [];

	sortedKit = sortedKit.map((s) => {
		if (s.pinned) {
			pinnedKit.push({
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

		if (s.kitText) {
			searchKit.push({
				slug: s.slug,
				subType: 'kit',
				content: `${s.title.toLowerCase()} ${s.excerpt.toLowerCase()} ${s.kitText}`
			});
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

	// console.log(searchKits);

	return {
		kits: sortedKit,
		searchKit,
		topicsKit: getAllTopics(allTopics),
		pinnedKit
	};
};
