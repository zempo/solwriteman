<script>
	import { dimension } from '$lib/store/dimension.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {
		const handleScroll = () => {
			dimension.currScrollLanding = window.scrollY;
			dimension.calcFeatured();
		};
		window.addEventListener('resize', handleScroll);
		window.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
</script>

{#if dimension.currScrollLanding > 80 && dimension.featElDist >= 0}
	<button
		class="skip_featured_btn"
		onclick={() => dimension.skipToFeatured('featured_content')}
		transition:fly={{ x: 100, duration: 400 }}
		aria-label="Skip to Featured"
		title="Skip Backstory"
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
		z-index: 2;
		background: var(--appTranslucent);
		color: var(--appTransparent);
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
		padding: 1rem 0.75rem 1rem 1rem;
		height: auto;
		font-weight: 800;
		box-shadow: var(--shadow3);
		background-color: var(--appBarTrans);
		color: white;
		border-color: var(--appTranslucent);
		border-right: none;
		box-shadow: var(--shadow3);
		transition: ease-in 0.15s;
		&:hover {
			background-color: #6ea3afa1;
			border-color: #6ea3af;
			transition: ease-in 0.25s;
		}
		&:active {
			bottom: 4.8rem;
		}
		&:focus {
			outline: 2px solid var(--accentMain); /* Change outline color and width */
			outline-offset: 2px; /* Space between the element and the outline */
		}
	}
</style>
