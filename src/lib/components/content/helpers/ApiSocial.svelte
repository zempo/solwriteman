<script>
	import { DELAY } from '$lib/config.js';
	import { onMount } from 'svelte';
	import { main } from '$lib/store/main.svelte.js';

	let siteTheme = main.selectedTheme.name === 'dark' ? 'gruvbox-dark' : 'icy-dark';

	let options = {
		src: 'https://utteranc.es/client.js',
		repo: 'zempo/solwriteman',
		label: 'comments',
		crossorigin: 'anonymous',
		// theme: `github-${main.socialTheme}`,
		theme: `photon-dark`,
		async: '',
		'issue-term': 'pathname'
	};

	onMount(() => {
		setTimeout(() => {
			let utteranceScript = document.createElement('script');
			const targetTag = document.getElementById('utterances-comments');

			for (const prop in options) {
				utteranceScript.setAttribute(prop, options[prop]);
			}

			targetTag.appendChild(utteranceScript);
		}, DELAY);
	});
</script>

<noscript>Enable javascript to leave comments.</noscript>
<div id="utterances-comments"></div>

<style lang="scss">
	/* @import "lib/assets/scss/..." */
	.timeline-header {
		color: var(--textMain) !important;
	}
</style>
