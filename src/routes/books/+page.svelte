<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.books} />
<PgWrap>
	<PgHero>{#snippet regHero()}{/snippet}</PgHero>
	<!-- 
	book preview 
	just external links page

	/books?this_book (highlight)
	-->
</PgWrap>
