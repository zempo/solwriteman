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
	<!-- 
	bytes:

	onclick opens

	copy code / image preview / notes .svx (no code linting)

	bytes/

	bytes/kit/this_component

	bytes/lab/this_shader or render (image)

	https://www.w3.org/WAI/ARIA/apg/patterns/
	-->
</PgMain>
