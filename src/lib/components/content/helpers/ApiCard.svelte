<script>
	import { byteKit, byteLab } from '$lib/components/static/svg/api';
	import { content } from '$lib/store/content.svelte';
	import { formatTimestampLong } from './api';

	const { posts = [], type = 'lab' } = $props();
</script>

<!-- 
			title: s.title,
			slug: s.slug,
			created_at: s.created_at,
			excerpt: s.excerpt,
-->

{#snippet postsLink(L, rdm = 1)}
	{#if rdm === 1}
		<a data-sveltekit-preload-data href="/bytes/{type}/{L.slug}">{L.title}</a>
	{:else}
		<a data-sveltekit-preload-data href="/bytes/{type}/{L.slug}">{rdm}</a>
	{/if}
{/snippet}

{#snippet tagList(T)}
	<li class="tag_item {T === content.byteTopic ? 'btn_hl' : ''}">
		<button class="tag_btn" onclick={() => content.toggleByteTopic(T)}>
			#{T}
		</button>
	</li>
{/snippet}

{#snippet postsItem(L, idx)}
	<li
		class="byte_item {L.topics.includes(content.byteTopic)
			? 'rw_hl'
			: ''}{content.byteMatchList.includes(L.slug) ? ' rw_match' : ''}"
	>
		<article class="byte_preview {type}_preview">
			<div class="prev_head">
				<div class="gl">
					{#if type === 'lab'}{@html byteLab}{:else}{@html byteKit}{/if}
				</div>
				<div class="gr">
					<h2 class="use_h4">{@render postsLink(L)}</h2>
					<p class="pub">{@html formatTimestampLong(L.created_at)}</p>
				</div>
			</div>
			<div class="prev_body">
				<p class="excerpt">
					{L.excerpt}
					{@render postsLink(L, 'Read More...')}
				</p>
			</div>
			<ul class="tag_list">
				{#each L.topics as T, idx}
					{@render tagList(T)}
				{/each}
			</ul>
		</article>
	</li>
{/snippet}

<ul class="byte_item_list">
	{#each posts as C, idx}
		{@render postsItem(C, idx)}
	{/each}
</ul>
