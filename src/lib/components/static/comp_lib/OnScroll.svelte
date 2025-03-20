<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	const { flyUp, fadeIn } = $props();

	let elRef = $state(false);
	let isVisible = $state(false);

	function checkVisibility() {
		if (!elRef) return;
		const rect = elRef.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		if (rect.top <= windowHeight * 0.85) {
			isVisible = true;
		}
	}

	onMount(() => {
		checkVisibility();
		window.addEventListener('scroll', checkVisibility);
		return () => window.removeEventListener('scroll', checkVisibility);
	});
</script>

{#if flyUp}
	{#key isVisible}
		<div class="scroll_razzle" bind:this={elRef} in:fly={{ y: 40, duration: 800 }}>
			{@render flyUp()}
		</div>
	{/key}
{/if}

{#if fadeIn}
	{#key isVisible}
		<div class="scroll_razzle" bind:this={elRef} in:fade={{ duration: 500 }}>
			{@render fadeIn()}
		</div>
	{/key}
{/if}

<style lang="scss">
	.scroll_razzle {
		display: inline-block;
		margin: auto;
	}
</style>
