<script>
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgNav from '$lib/components/layout/PgNav.svelte';
	import { main } from '$lib/store/main.svelte.js';
	import '$lib/style/globals.scss';
	export let data;

	$: main.currentPage = data.path;
</script>

<PgNav>{#snippet topBar()}{/snippet}</PgNav>
<PgNav>{#snippet mainNav()}{/snippet}</PgNav>
{#key data.path}
	<PgMain>
		<div in:fade|global={transitionIn} out:fade|global={transitionOut}>
			<slot />
		</div>
		<!-- <TopScroll /> -->
	</PgMain>
{/key}
