/**
 * ?? Content overview
 *  *home : shader slideshow, bio, picture, quicklinks
 *  *books: book listings
 *  *bytes: graphs, shaders, npms (categorial search)
 *  *snippets: preview of substack, publications, 3-5 videos
 *
 *  https://read.cv/seanehalpin (cv reader)
 *  https://adplist.org/ (mentorship)
 *
 *  use https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary (summary/details tag)
 *
 *  ?? new svelte features
 *  https://svelte.dev/playground/8ac86e10fdce485a99c29c95e0092df4?version=5.11.0 (innerwidth/height)
 *  (get/set bindings)
 *  https://svelte.dev/playground/1ddd82f573b94201b3c8fcab33bf0a46?version=5.9.0#H4sIAAAAAAAAA21U247bNhD9lanQwlIhybKxKRKt5SLI9qEPmzwkL0ZcZGlxbLMrDQVyJNs1_O8BdfN6uzBgzp2Hh4c6eyRK9FLv094oy6WwkOuaWOoDeaG3VQVaL_1-9vhUuTIX8MKh6WNVxbbBgl1sIyy-Fc81MRJbL_UWNjeq4uWa1pxrsgxfPv_14-HjCjKY38Hv8Ecy_M2SJLlfk6sskKFUBBlMZh8-vItm8yiZTe7HlDi61DyZ37nU_P01lY-HyoDwAA-C0XeV7ZD5u0nQlg7lUjBCBr9adnVjQxCMAw2WQpGinSuTaFSD0n8UvI9zVIXvXzeM2mkBTIcjtlMW0ysDtJCqaalYKKrqFsWaHc_Z2nPNa68LlYqyc6no0rvimJ1LcezdjSKZNqKoMTt3kTX7AWRLGN01T6fAtSFQxBp4j7BarVbR42P08ABbbUrBgMcKc0YJm1Nb8QKT-xlsBzhcMeu_v375ykbRzg9iW6gc_SSEWdLTyWu-hCOW5g0wjShUy_a4E_jOfCoVPU2fSnF8AsFs1KZmtKCpON30H7R5dsDb_lwUSFIYqHRVVyGQZmA8MiCxOQVxHF971Rb8BhZOTwE0kDnj_nV66TTVp8XxRfoGQxzHgiSwEWQdh695tS1BHeWiJe7a3ittlFjzgrnOaJfpcpDnolqeR_Fd4PxCiFkGM_gTJlKcJpC2q51cgDXsNNTEqoDxcf-ymFZLJ8NeerSwfCqw3UaqZrilSlvFSlMKW3VE2WMrcMspJL3Huro6ByV5n7pH-1sf2aPa7fkmJJWtCnFKYVvgwKozI6kM5t1-uS7qcrgRUagdRYqxtCnkSIymz_xbW1bbU9R_W15lNyJ_3hldk0zBCKlEEe3cisS-4L42hJ1BpBCkMM-tGdwPN5zrQpsUPglqhB2QauLIqv8wdZrx51iGcNccuou7dF-qTsnna0MKivZoFP9_yBzLAa42Ek3kENY2hSS-piohpaJdCslNuOtIgTThG2e-wX1zlm945AHwYtrdvRd67rV4KZsaL_9cfgLg2fGqEwYAAA==
 *  *
 * */
export const siteURL = `https://solomonzelenko.dev`;
export const siteImg = `https://i.imgur.com/T1shE6J.png`;
export const siteAlt = `On Mic, On Paper, Online with Solomon Zelenko`;
export const desc = `🍊 OC-Based Digital Storyteller & Artist.`;
export const blogLaunchDate = `2025-04-02`;
export const DELAY = 360;
export const rssData = {
	siteTitle: `Solomon Zelenko`,
	siteURL,
	siteDesc: desc,
	siteImg,
	siteAuthor: `Solomon Zelenko`
};

export const navData = {
	hrefs: ['/', '/books', '/bytes', '/snippets', '/contact'],
	pages: [
		{
			href: `/`,
			title: `Main`
		},
		{
			// ?? book read/buy links
			href: `/books`,
			title: `Books`
		},
		{
			// ?? cool art bytes
			href: `/bytes`,
			title: `Bytes`
		},
		{
			// ?? site articles
			href: `/snippets`,
			title: `Snippets`
		},
		{
			// svelte:self tools rolled into FAQ section
			// ?? link to shops, youtube, etc
			href: `/contact`,
			title: `Contact`
		}
	],
	socialLinks: [
		{
			href: `/api/rss.xml`,
			external: 1,
			title: `RSS`
		},
		{
			href: `https://ko-fi.com/solzelenko`,
			external: 1,
			title: `Ko-Fi`
		},
		{
			href: 'https://www.tiktok.com/@zempocreates',
			exteral: 1,
			title: 'TikTok'
		},
		{
			href: `https://solwriteman.substack.com`,
			external: 1,
			title: `Substack`
		},
		{
			href: `https://www.youtube.com/@solwriteman`,
			external: 1,
			title: `YouTube`
		},
		// TODO youtube channel, discord poetry (adhd creatives?) server?
		{
			href: `https://github.com/zempo`,
			external: 1,
			title: `GitHub`
		}
	]
};

export const tabLabels = {
	bio: ['Artist Statement', 'getBackground()', 'Strengths & Services'],
	bio_ada: ['Artist Statement', 'Background', 'Strengths and Services']
};

export const defaultSEO = {
	img: siteImg,
	alt: siteAlt,
	type: 'website'
};
export const titles = {
	books: `Books`,
	bytes: `Bytes`,
	snippets: `Snippets`,
	contact: `Connect`
};
export const taglines = {
	books: `<span aria-hidden="true">📚</span> Storytold In a Nerdy Niche.`,
	bytes: `<span aria-hidden="true">💻</span> Keep Calm And Debug On™`,
	snippets: `<span aria-hidden="true">✍️</span> From Notes App to Table.`,
	contact: `<span aria-hidden="true">👋</span> Feedback / Commissions / Mentoring` // 🐋, hello there
};
export const seoData = {
	main: {
		title: `Solomon Zelenko`,
		desc,
		...defaultSEO
	},
	books: {
		title: `SolWriteMan • eBooks, Chapbooks, & Zines`,
		desc: taglines.books,
		...defaultSEO
	},
	bytes: {
		title: `Zempo • Code Bytes`,
		desc: taglines.bytes,
		...defaultSEO
	},
	snippets: {
		title: `SolWriteMan • Text Snippets`,
		desc: taglines.snippets,
		...defaultSEO
	},
	contact: {
		title: `Solomon Z • All My Links`,
		desc: taglines.contact,
		...defaultSEO
	}
};
