import { rssData, siteImg } from '$lib/config';
// import { render } from 'svelte/server';

export const prerender = true;

export const GET = async () => {
	const dataLabs = await Promise.all(
		Object.entries(import.meta.glob('$lib/components/content/lab/*.svx')).map(
			async ([path, page]) => {
				const { metadata } = await page();
				const slug = path.split('/').pop().split('.').shift();
				return { ...metadata, slug };
			}
		)
	).then((labs) => {
		return labs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	});
	const dataKits = await Promise.all(
		Object.entries(import.meta.glob('$lib/components/content/kit/*.svx')).map(
			async ([path, page]) => {
				const { metadata } = await page();
				const slug = path.split('/').pop().split('.').shift();
				return { ...metadata, slug };
			}
		)
	).then((kits) => {
		return kits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	});

	const body = render(dataLabs, dataKits);
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};
	return new Response(body, {
		status: 200,
		headers
	});
};

const render = (labs, kits) => {
	const escapeXml = (str) => {
		if (!str) return '';
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	};

	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${escapeXml(rssData.siteTitle)}</title>
<description>${escapeXml(rssData.siteDesc)}</description>
<link>${rssData.siteURL}</link>
<atom:link href="${rssData.siteURL}rss.xml" rel="self" type="application/rss+xml"/>
${labs
	.map((lab) => {
		let labImg = escapeXml(lab.cover_img ?? siteImg);
		return `<item>
  <title>${escapeXml(lab.title)}</title>
  <link>${rssData.siteURL}/bytes/lab/${escapeXml(lab.slug)}</link>
  <description>${escapeXml(lab.excerpt)}</description>
  <guid isPermaLink="true">${rssData.siteURL}/bytes/lab/${escapeXml(lab.slug)}</guid>
  <author>${escapeXml(rssData.siteAuthor)}</author>
${lab.topics.map((t) => `<category>${escapeXml(t)}</category>`).join('')}
<pubDate>${new Date(lab.created_at).toUTCString()}</pubDate>
<media:thumbnail url="${labImg}" width="150" height="150" />
</item>`;
	})
	.join('')}
${kits
	.map((kit) => {
		let kitImg = escapeXml(kit.cover_img ?? siteImg);
		return `<item>
  <title>${escapeXml(kit.title)}</title>
  <link>${rssData.siteURL}/bytes/kit/${escapeXml(kit.slug)}</link>
  <description>${escapeXml(kit.excerpt)}</description>
  <guid isPermaLink="true">${rssData.siteURL}/bytes/kit/${escapeXml(kit.slug)}</guid>
  <author>${escapeXml(rssData.siteAuthor)}</author>
${kit.topics.map((t) => `<category>${escapeXml(t)}</category>`).join('')}
<pubDate>${new Date(kit.created_at).toUTCString()}</pubDate>
<media:thumbnail url="${kitImg}" width="150" height="150" />
</item>`;
	})
	.join('')}
</channel>
</rss>`;
};
