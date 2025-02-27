<script>
	import { arwL, arwR } from '../svg/nav';

	export let dir = 0;
</script>

<button class="nav_btn nav_btn_prev" aria-label={`Go to page`}>
	{#if dir === 0}
		{@html arwR}
	{:else}
		{@html arwL}
	{/if}
</button>
