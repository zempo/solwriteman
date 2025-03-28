<script>
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
			<h2>{@render contentLink(L)}</h2>
		</article>
	</li>
{/snippet}

<ul class="byte_item_list">
	{#each content as C, idx}
		{@render contentItem(C, idx)}
	{/each}
</ul>
