<script>
	import { siteURL } from '$lib/config';
	import { main } from '$lib/store/main.svelte';
	// import { currentPage } from '$lib/js/store';
	export let pgData;
	$: console.log(pgData);
</script>

<svelte:head>
	<meta data-key="description" name="description" content={pgData.desc} />
	{#if pgData.img}
		<meta content={pgData.img} name="twitter:image" />
	{/if}
	<meta property="og:title" content={pgData.title} />
	<meta property="twitter:title" content={pgData.title} />
	<meta property="og:description" content={pgData.desc} />
	<meta property="twitter:description" content={pgData.desc} />
	<meta property="og:image" content={pgData.img} />
	<meta property="twitter:image" content={pgData.img} />
	<meta name="twitter:image:alt" content={pgData.alt} />
	<meta property="og:type" content={pgData.type} />
	<meta property="og:url" content={`${siteURL}${main.currentPage}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:site_name" content="Solomon Zelenko" />
	<title>{pgData.title}</title>
</svelte:head>
