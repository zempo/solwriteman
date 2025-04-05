<script>
	import ApiAside from '$lib/components/content/helpers/ApiAside.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { searchIcon } from '$lib/components/static/svg/nav.js';
	import { content } from '$lib/store/content.svelte.js';
	import { page } from '$app/state';
	import { combineTopics, combineObjArrays } from '$lib/components/content/helpers/api.js';
	import { onMount } from 'svelte';

	const { children, data } = $props();
	let query = $state('');

	// let urlTopic = null;
	$effect.pre(() => {
		content.queryByteTopic(page.url);
	});

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

	onMount(() => {
		content.setTopicObj(labs, kits);
	});
</script>

{#snippet searchForm()}
	<form
		autocomplete="off"
		role="search"
		class="search_form"
		onsubmit={(e) => content.handleSearch(e, query, [...searchLab, ...searchKit])}
	>
		<label for="byte_search" class="sr">Filter Bytes by Keyword</label>
		<input
			id="byte_search"
			class="search_input"
			bind:value={query}
			oninput={() => {
				if (query === '') content.handleClear();
			}}
			placeholder="Find the Best Byte"
			type="search"
		/>
		<button type="submit" title="Search" aria-label="Submit search" class="search_btn"
			>{@html searchIcon}</button
		>
	</form>
{/snippet}

{#snippet pinnedPosts(pinned)}
	<h2 class="use_h4">Pinned</h2>
	<ul class="pinned_list">
		{#each pinned as P}
			<li class="pinned_item">
				<a href={`/bytes/${P.byte_type}/${P.slug}`} class="pinned_link">
					{P.title}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet allTagsList(Topic)}
	<h2 class="use_h4">Topics</h2>
	<ul class="all_tags_list">
		{#each Topic as T}
			<li class="tag_item">
				<button
					class="tag_btn {T === content.byteTopic ? 'btn_hl' : ''}"
					onclick={() => content.toggleByteTopicLink(T)}
				>
					#{T}
				</button>
			</li>
		{/each}
	</ul>
{/snippet}

<PgWrap type="w">
	<ApiAside>
		{@render searchForm()}
		{@render pinnedPosts(combineObjArrays(pinnedLab, pinnedKit))}
		{@render allTagsList(combineTopics(topicsLab, topicsKit))}
	</ApiAside>
	{@render children()}
</PgWrap>
