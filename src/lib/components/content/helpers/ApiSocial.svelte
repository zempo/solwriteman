<script>
	import { DELAY } from '$lib/config.js';
	import { onMount } from 'svelte';
	import { main } from '$lib/store/main.svelte.js';

	const siteTheme = main.selectedTheme.name === 'dark' ? 'github-dark' : 'github-light';

	const options = {
		src: 'https://utteranc.es/client.js',
		repo: 'zempo/solwriteman',
		label: 'comments',
		crossorigin: 'anonymous',
		theme: siteTheme,
		async: '',
		'issue-term': 'pathname'
	};

	onMount(() => {
		setTimeout(() => {
			const utteranceScript = document.createElement('script');
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
