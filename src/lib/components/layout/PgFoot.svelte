<script>
	import { navData } from '$lib/config';
	import { main } from '$lib/store/main.svelte';

	// const { navItem } = $props();
	let currYr = () => {
		let d = new Date();
		return d.getFullYear();
	};
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
	<nav class="foot_menu" aria-label="Quick Links">
		<span class="use_h3" aria-hidden="true">Pages</span>
		<ul class="foot_list_main foot_list">
			{#each navData.pages as P}
				{@render navItem(P)}
			{/each}
		</ul>
	</nav>
	<nav class="foot_menu socials_menu" aria-label="My Socials">
		<span class="use_h3" aria-hidden="true">Socials</span>
		<ul class="foot_list_main foot_list">
			{#each navData.socialLinks as P}
				{@render navItem(P)}
			{/each}
		</ul>
	</nav>
	<div class="foot_content">
		<a href="https://notbyai.fyi/about" class="not_ai_img" target="_blank" rel="noopener noreferrer"
			><img src="/img/ai-badge.svg" alt="Made by a human, not by AI." class="foot_img" /><span
				class="aria_text">Made by a human, not by AI.</span
			></a
		>
		<p>&copy;2020-{currYr()} Solomon Zelenko</p>
		<p>
			⚙️ Made with <a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer"
				>SvelteKit</a
			>;<br />☁️ Hosted on
			<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare</a
			>;<br />
			☕ Powered by Caffeine.
		</p>
	</div>
	<!-- copyright -->
</footer>
