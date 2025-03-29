<script>
	import { byteKit, byteLab } from '$lib/components/static/svg/api';
	import { formatTimestampLong } from './api';

	const { content = [], type = 'lab' } = $props();
</script>

<!-- 
			title: s.title,
			slug: s.slug,
			created_at: s.created_at,
			excerpt: s.excerpt,
-->

{#snippet contentLink(L, rdm = 1)}
	{#if rdm === 1}
		<a data-sveltekit-preload-data href="/bytes/{type}/{L.slug}">{L.title}</a>
	{:else}
		<a data-sveltekit-preload-data href="/bytes/{type}/{L.slug}">{rdm}</a>
	{/if}
{/snippet}

{#snippet tagList(T)}
	<li class="tag_item">
		<a href="/bytes?topic={T}">#{T}</a>
	</li>
{/snippet}

{#snippet contentItem(L, idx)}
	<li class="byte_item">
		<article class="byte_preview {type}_preview">
			<div class="prev_head">
				<div class="gl">
					{#if type === 'lab'}{@html byteLab}{:else}{@html byteKit}{/if}
				</div>
				<div class="gr">
					<h2 class="use_h4">{@render contentLink(L)}</h2>
					<p class="pub">{@html formatTimestampLong(L.created_at)}</p>
				</div>
			</div>
			<div class="prev_body">
				<p class="excerpt">
					{L.excerpt}
					{@render contentLink(L, 'Read More...')}
				</p>
				<ul class="tag_list">
					{#each L.topics as T, idx}
						{@render tagList(T)}
					{/each}
				</ul>
			</div>
		</article>
	</li>
{/snippet}

<ul class="byte_item_list">
	{#each content as C, idx}
		{@render contentItem(C, idx)}
	{/each}
</ul>
