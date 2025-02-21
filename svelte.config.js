// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import { sveltePreprocess } from 'svelte-preprocess';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import highlighter from './codeHighlighter.mjs';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/style/`;

// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
// import rehypeExternalLinks from 'rehype-external-links';
// import toc from '@jsdevtools/rehype-toc';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md', '.svx']
			// highlight: {
			// 	highlighter
			// }
			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			// rehypePlugins: [
			// 	rehypeSlug,
			// 	rehypeAutolinkHeadings,
			// ],
		}),
		sveltePreprocess({
			scss: {
				// We can use a path relative to the root because
				// svelte-preprocess automatically adds it to `includePaths`
				// if none is defined.
				prependData: `@use '${sassPath}vars';`
			}
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: ['*']
			// entries: ['*', '/bytes', '/snippets']
			// handleHttpError: 'ignore'
			// handleHttpError: ({ path, referrer, message }) => {
			// 	if (path === '/not-found' && referrer === '/snippets') {
			// 		return;
			// 	}
			// 	throw new Error(message);
			// }
		}
	}
};

export default config;
