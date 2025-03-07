<script>
	import { page } from '$app/state';
	import { taglines, titles } from '$lib/config';
	import { dimension } from '$lib/store/dimension.svelte';
	import { main } from '$lib/store/main.svelte';

	let { regHero } = $props();
</script>

{#if regHero}
	<header class="{main.getKey()}_hero reg_hero">
		<h1>{titles[main.getKey()]}</h1>
		<p class="sub_title">{taglines[main.getKey()]}</p>
	</header>
{/if}
