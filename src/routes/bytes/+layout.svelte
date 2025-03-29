<script>
	import ApiAside from '$lib/components/content/helpers/ApiAside.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { searchIcon } from '$lib/components/static/svg/nav.js';

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
		<form autocomplete="off" role="search" class="search_form">
			<label for="byte_search" class="sr">Filter Bytes by Keyword</label>
			<input id="byte_search" class="search_input" placeholder="Explore Art" type="search" />
			<button type="submit" title="Search" aria-label="Submit search" class="search_btn"
				>{@html searchIcon}</button
			>
		</form>
	</ApiAside>
</PgWrap>
