<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.snippets} />
<PgWrap>
	<PgHero />
	<div class="spacer"></div>
	<!-- 
	snippets:

	snippets?this_tag (image preview / summary of external substack link)

	make table
	-->
</PgWrap>
