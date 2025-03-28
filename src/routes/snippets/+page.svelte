<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.snippets} />
<PgWrap>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
	</section>
	<!-- 
	snippets:

	snippets?this_tag (image preview / summary of external substack link)

	make table
	-->
</PgWrap>
