<script>
	import { navData } from '$lib/config';
	import { main } from '$lib/store/main.svelte';

	const { navItem } = $props();
</script>

{#snippet navItem(L)}
	<li class={`foot_link ${main.isActiveLink(L.href)}`}>
		{#if L.external}
			<a href={L.href} target="_blank" rel="noopener noreferrer">{L.title}</a>
		{:else}
			<a href={L.href}>{L.title}</a>
		{/if}
	</li>
{/snippet}

<footer class="app_footer">
	<!-- pages list -->
	<nav class="foot_menu" aria-label="Footer Menu">
		<ul class="foot_list_main foot_list">
			{#each navData.pages as P}
				{@render navItem(P)}
			{/each}
		</ul>
	</nav>
	<!-- some socials list -->
	<!-- copyright -->
</footer>
