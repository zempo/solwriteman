<script>
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgNav from '$lib/components/layout/PgNav.svelte';
	import { main } from '$lib/store/main.svelte.js';
	import '$lib/style/globals.scss';
	import { getRouteClass } from '$lib/components/static/utils/nav.js';
	import PgFoot from '$lib/components/layout/PgFoot.svelte';
	import { dimension } from '$lib/store/dimension.svelte.js';
	export let data;

	$: main.currentPage = data.path;
	const transitionIn = { easing: cubicOut, duration: 300, delay: 200 };
	const transitionOut = { easing: cubicIn, duration: 300 };
</script>

<svelte:window bind:scrollY={dimension.currScrollLanding} bind:innerWidth={dimension.currW} />

<PgNav
	>{#snippet topBar()}
		{#key data.path}
			<div class={`header_clr ${getRouteClass(main.currentPage)}`} role="presentation"></div>
		{/key}
	{/snippet}
</PgNav>
<PgNav>{#snippet btmBar()}{/snippet}</PgNav>
{#key data.path}
	<PgMain>
		<div in:fade|global={transitionIn} out:fade|global={transitionOut}>
			<slot />
		</div>
	</PgMain>
{/key}
<PgFoot />

<style lang="scss">
	/* @import "lib/assets/scss/..." */
	@mixin transition($property: all, $duration: 0.3s, $timing: ease, $delay: 0s) {
		-webkit-transition: $property $duration $timing $delay;
		-moz-transition: $property $duration $timing $delay;
		-ms-transition: $property $duration $timing $delay;
		-o-transition: $property $duration $timing $delay;
		transition: $property $duration $timing $delay;
	}

	.animate-brighten-slide {
		-webkit-animation: brightenSlideIn 0.5s ease-out forwards;
		-moz-animation: brightenSlideIn 0.5s ease-out forwards;
		-ms-animation: brightenSlideIn 0.5s ease-out forwards;
		-o-animation: brightenSlideIn 0.5s ease-out forwards;
		animation: brightenSlideIn 0.5s ease-out forwards;
	}

	.header_clr {
		display: inline-block;
		width: 100%;
		height: 0.35rem;
		position: relative;
		top: 0rem;
		line-height: 0;
		padding: 0;
		margin: 0;
		border-bottom-left-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
		@extend .animate-brighten-slide;
		@include transition(all, 0.3s, ease-in-out);
		&.main_on {
			background: var(--accentGradient);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
		&.books_on {
			background: var(--accentMain);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
		&.bytes_on {
			background: var(--accentWorks);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
		&.snippets_on {
			background: var(--accentSnip);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
		&.socials_on {
			background: var(--accentByte);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
		&.community_on,
		&.merch_on,
		&.tools_on {
			background: var(--accentGradient);
			@include transition(all, 0.3s, ease-in-out);
			@extend .animate-brighten-slide;
		}
	}

	// Webkit (Safari, Chrome, newer versions of Opera)
	@-webkit-keyframes brightenSlideIn {
		0% {
			opacity: 0;
			-webkit-filter: brightness(50%);
			-webkit-transform: translateX(100%);
		}
		100% {
			opacity: 1;
			-webkit-filter: brightness(100%);
			-webkit-transform: translateX(0);
		}
	}

	// Mozilla Firefox
	@-moz-keyframes brightenSlideIn {
		0% {
			opacity: 0;
			-moz-filter: brightness(50%);
			-moz-transform: translateX(100%);
		}
		100% {
			opacity: 1;
			-moz-filter: brightness(100%);
			-moz-transform: translateX(0);
		}
	}

	// Microsoft Internet Explorer
	@-ms-keyframes brightenSlideIn {
		0% {
			opacity: 0;
			-ms-filter: brightness(50%);
			-ms-transform: translateX(100%);
		}
		100% {
			opacity: 1;
			-ms-filter: brightness(100%);
			-ms-transform: translateX(0);
		}
	}

	// Opera (older versions)
	@-o-keyframes brightenSlideIn {
		0% {
			opacity: 0;
			-o-filter: brightness(50%);
			-o-transform: translateX(100%);
		}
		100% {
			opacity: 1;
			-o-filter: brightness(100%);
			-o-transform: translateX(0);
		}
	}

	// Standard syntax (must be last)
	@keyframes brightenSlideIn {
		0% {
			opacity: 0;
			filter: brightness(50%);
			transform: translateX(100%);
		}
		100% {
			opacity: 1;
			filter: brightness(100%);
			transform: translateX(0);
		}
	}
</style>
