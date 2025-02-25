<script>
	import { navData } from '$lib/config';
	import { main } from '$lib/store/main.svelte';

	let { mainNav, socialNav, footMain, footSocial } = $props();
</script>

{#snippet navItem(L)}
	<li
		class={`nav_link ${main.currentPage.includes(L.href) ? `nav_link_active ${main.currentPage}` : `nav_link_default`}`}
	>
		{#if L.external}
			<a href={L.href} target="_blank" rel="noopener noreferrer">{L.title}</a>
		{:else}
			<a href={L.href}>{L.title}</a>
		{/if}
	</li>
{/snippet}

<!-- *goes inside modal dialog -->
{#if mainNav}
	<nav class="main_nav" aria-label="Site Menu">
		<ul class="nav_list_main nav_list">
			{#each navData.pages as P}
				{@render navItem(P)}
			{/each}
		</ul>
	</nav>
{/if}
