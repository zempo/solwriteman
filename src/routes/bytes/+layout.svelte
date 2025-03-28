<script>
	import ApiAside from '$lib/components/content/helpers/ApiAside.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';

	const { children, data } = $props();

	const {
		labs,
		topicsLab,
		searchLab,
		pinnedLab,
		countLab,
		kits,
		topicsKit,
		searchKit,
		pinnedKit,
		countKit
	} = data;
</script>

<PgWrap type="w">
	{@render children()}
	<ApiAside>
		<h2>boob</h2>
	</ApiAside>
</PgWrap>
