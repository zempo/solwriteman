<script>
	import { page } from '$app/state';
	import { taglines, titles } from '$lib/config';
	import { dimension } from '$lib/store/dimension.svelte';
	import { main } from '$lib/store/main.svelte';

	let { regHero = 'pg', meta } = $props();
</script>

{#if regHero === 'pg'}
	<header class="{main.getKey()}_hero reg_hero">
		<h1>{titles[main.getKey()]}</h1>
		<p class="sub_title">{taglines[main.getKey()]}</p>
	</header>
{:else if regHero === 'post'}
	<header class="{main.getKey()}_hero post_hero">
		<h1>{meta.title}</h1>
		<!-- <p class="sub_title">{taglines[main.getKey()]}</p> -->
	</header>
{/if}
