<script>
	import PgMain from '$lib/components/layout/PgMain.svelte';
	export let data;
</script>

{#key data.path}
	<PgMain>
		<div in:fade|global={transitionIn} out:fade|global={transitionOut}>
			<slot />
		</div>
		<!-- <TopScroll /> -->
	</PgMain>
{/key}
