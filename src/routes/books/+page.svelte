<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.books} />
<PgMain>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
	</section>
	<!-- 
	book preview 
	just external links page

	/books?this_book (highlight)
	-->
</PgMain>
