<script>
	import ApiAside from '$lib/components/content/helpers/ApiAside.svelte';

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

{@render children()}
<ApiAside>
	<h2>boob</h2>
</ApiAside>
