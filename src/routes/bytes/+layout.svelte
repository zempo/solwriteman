<script>
	import ApiAside from '$lib/components/content/helpers/ApiAside.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { searchIcon } from '$lib/components/static/svg/nav.js';
	// import { page } from '$app/state';

	const { children, data } = $props();

	// let url = $page.url;
	// let urlTopic = null;
	// $effect.pre(() => {
	// 	urlTopic = url.searchParams.get('topic')
	// })

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

{#snippet searchForm()}
	<form autocomplete="off" role="search" class="search_form">
		<label for="byte_search" class="sr">Filter Bytes by Keyword</label>
		<input id="byte_search" class="search_input" placeholder="Explore Art" type="search" />
		<button type="submit" title="Search" aria-label="Submit search" class="search_btn"
			>{@html searchIcon}</button
		>
	</form>
{/snippet}

{#snippet allTagsList(T)}
	<ul class="all_topics_list">
		{@render allTagsList()}
	</ul>
{/snippet}

<PgWrap type="w">
	<ApiAside>
		{@render searchForm()}
	</ApiAside>
	{@render children()}
</PgWrap>
