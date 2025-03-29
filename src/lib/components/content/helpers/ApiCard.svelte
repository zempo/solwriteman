<script>
	import { formatTimestampLong } from './api';

	const { content = [], type = 'lab' } = $props();
</script>

<!-- 
			title: s.title,
			slug: s.slug,
			created_at: s.created_at,
			excerpt: s.excerpt,
-->

{#snippet contentLink(L)}
	<a data-sveltekit-preload-data href="/bytes/{type}/{L.slug}">{L.title}</a>
{/snippet}

{#snippet contentItem(L, idx)}
	<li class="byte_item">
		<article class="byte_preview {type}_preview">
			<div class="prev_head">
				<div class="gl">icon</div>
				<div class="gr">
					<h2 class="use_h4">{@render contentLink(L)}</h2>
					<p class="pub">{@html formatTimestampLong(L.created_at)}</p>
				</div>
			</div>
		</article>
	</li>
{/snippet}

<ul class="byte_item_list">
	{#each content as C, idx}
		{@render contentItem(C, idx)}
	{/each}
</ul>
