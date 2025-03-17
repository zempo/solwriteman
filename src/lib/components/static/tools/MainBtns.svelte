<script>
	import { goto } from '$app/navigation';
	import { main } from '$lib/store/main.svelte';
	import { arwL, arwR } from '../svg/nav';

	export let dir = 0;

	const sideNav = () => {
		let target = main.getNextPg(dir);
		goto(target);
	};
</script>

<button
	class="nav_btn nav_btn_{dir === 0 ? 'prev' : 'fwd'}"
	aria-label={`Go to ${main.getLabel(dir)} page`}
	onclick={sideNav}
	title="View {main.getLabel(dir)}"
>
	{#if dir == 0}
		{@html arwR}
	{:else}
		{@html arwL}
	{/if}
</button>
