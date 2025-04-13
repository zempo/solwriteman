<script>
	import { siteImg, siteAlt } from '$lib/config.js';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import ApiAuthor from '$lib/components/content/helpers/ApiAuthor.svelte';
	import ApiSocial from '$lib/components/content/helpers/ApiSocial.svelte';
	import { dev } from '$app/environment';

	const { data } = $props();
	const { byteMeta, byteContent } = data;
	const Body = byteContent;

	let seoObj = {
		title: byteMeta.title,
		desc: byteMeta.excerpt,
		img: byteMeta.cover_img ?? siteImg,
		alt: byteMeta.cover_alt ?? siteAlt,
		type: byteMeta.seo_type ?? 'article'
	};
</script>

<PgHead pgData={seoObj} />
<PgHero regHero="post" meta={byteMeta} />
<article class="byte_pg">
	<div class="body_wrap">
		<Body />
	</div>
	<ApiAuthor tags={byteMeta.topics} slug={byteMeta.slug} subtype="kit" />
	{#if !dev}
		<ApiSocial />
	{/if}
</article>
