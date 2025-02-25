<script>
	import { navData } from '$lib/config';
	import { main } from '$lib/store/main.svelte';
	import { logoFull } from '../static/svg/brand';
	import SiteSettings from '../static/tools/SiteSettings.svelte';
	import { getRouteClass } from '../static/utils/nav';

	let { topBar, mainNav, socialNav, footMain, footSocial } = $props();
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

{#if topBar}
	<header class={`app_header ${getRouteClass(main.currentPage)}`}>
		<div class="header_logo">
			<a href="/" aria-label="Home link" title="Home">{@html logoFull}</a>
		</div>
		<SiteSettings />
	</header>
{/if}

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
