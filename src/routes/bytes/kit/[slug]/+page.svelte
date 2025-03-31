<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';

	const { data } = $props();
	const { byteMeta, byteContent } = data;
	const Body = byteContent;
</script>

<PgHero regHero="post" meta={byteMeta} />
<article class="byte_pg">
	<Body />
	<!-- add topics, etc down here -->
</article>
