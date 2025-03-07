<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.bytes} />
<PgMain>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
	</section>
</PgMain>
