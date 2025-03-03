<script>
	import { main } from '$lib/store/main.svelte';
	import { arwL, arwR } from '../svg/nav';

	export let dir = 0;
</script>

<button
	class="nav_btn nav_btn_{dir === 0 ? 'prev' : 'fwd'}"
	aria-label={`Go to page`}
	onclick={() => main.getNextPg()}
>
	{#if dir == 1}
		{@html arwR}
	{:else}
		{@html arwL}
	{/if}
</button>
