<script>
	import SiteSettings from '../static/tools/SiteSettings.svelte';
	import MainBtns from '../static/tools/MainBtns.svelte';
	import Modal from '../static/tools/Modal.svelte';
	import { getRouteClass } from '../static/utils/nav';
	import { arwL, arwR, menuIcon } from '../static/svg/nav';
	import { logoFull } from '../static/svg/brand';
	import { navData } from '$lib/config';
	import { dimension } from '$lib/store/dimension.svelte';
	import { main } from '$lib/store/main.svelte';

	let { topBar, btmBar, dialog, mainNav, socialNav, footMain, footSocial } = $props();
</script>

{#snippet navItem(L)}
	<li class={`nav_link ${main.isActiveLink(L.href)}`}>
		{#if L.external}
			<a href={L.href} target="_blank" rel="noopener noreferrer">{L.title}</a>
		{:else}
			<a href={L.href}>{L.title}</a>
		{/if}
	</li>
{/snippet}

{#if topBar}
	<header
		class={`app_header ${getRouteClass(main.currentPage)}`}
		bind:clientHeight={dimension.topbarH}
	>
		<div class="topbar">
			<div class="header_logo">
				<a href="/" aria-label="Home link" title="Home">{@html logoFull}</a>
			</div>
			<SiteSettings />
		</div>
		{@render topBar()}
	</header>
{/if}

{#if btmBar}
	<nav class="app_bar" aria-label="Primary Navigation">
		<MainBtns dir={1} />
		<button
			class="nav_btn nav_btn_menu"
			id="menu-button"
			aria-haspopup="dialog"
			aria-controls="site-menu"
			onclick={() => main.setModalOpen(2)}
		>
			{@html menuIcon}
		</button>
		<MainBtns />
	</nav>
	<!-- {#if main.modalOpen} -->
	<Modal close={() => main.setModalOpen(0)}>
		<nav class="main_nav modal_nav" aria-label="Site Menu">
			<ul class="nav_list_main nav_list">
				{#each navData.pages as P}
					{@render navItem(P)}
				{/each}
			</ul>
		</nav>
	</Modal>
	<!-- {/if} -->
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
