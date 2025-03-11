<script>
	import { dimension } from '$lib/store/dimension.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {
		const handleScroll = () => {
			dimension.currScrollLanding = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if dimension.currScrollLanding > 80 && dimension.currScrollLanding < 600}
	<button
		class="skip_featured_btn"
		onclick={() => dimension.skipToFeatured('featured_content')}
		transition:fly={{ y: 100, duration: 400 }}
		aria-label="Skip to Featured"
	>
		<span aria-hidden="true">TL;DR</span></button
	>
{:else}
	<!--  -->
{/if}

<style lang="scss">
	.skip_featured_btn {
		position: fixed;
		bottom: 5rem;
		right: 0;
		z-index: 1;
		background: var(--appFig);
		color: var(--appConst);
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
		padding: 0.75rem 0.5rem 0.75rem 1rem;
		height: auto;
		font-weight: 800;
		box-shadow: var(--shadow3);
		&:hover {
			transition: ease-in 0.5s;
			box-shadow: inset 50px 0 0 0 var(--accentMain);
			color: rgb(11, 11, 15);
		}
	}
</style>
