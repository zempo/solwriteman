// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import { sveltePreprocess } from 'svelte-preprocess';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { visit } from 'unist-util-visit';
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
			extensions: ['.md', '.svx'],
			// highlight: {
			// 	highlighter
			// }
			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			// rehypePlugins: [
			// 	rehypeSlug,
			// 	rehypeAutolinkHeadings,
			// ],
			remarkPlugins: [
				() => (tree) => {
					visit(tree, 'code', (node) => {
						let lines = node.value.split('\n');
						let newLines = [];

						lines.forEach((L) => {
							let trim = L.trim();
							let isComment =
								trim.startsWith('//') || trim.startsWith('#') || trim.startsWith('<!--');

							// Create a new code node for each line
							const newL = {
								type: 'element',
								tagName: 'span',
								properties: {
									className: isComment
										? [`language-${node.lang} cmt`]
										: [`language-${node.lang} ln`]
								},
								children: [
									{
										type: 'text',
										value: L
									}
								]
							};
							// console.log(newL);
							newLines.push(newL);
						});

						let newCode = {
							type: 'element',
							tagName: 'code',
							properties: {
								className: [`language-${node.lang}`]
							},
							children: newLines
						};
						node = newCode;
						console.log(node);
						// node.value = node.value.split('\n').map(line => {
						// 	const trimmed = line.trim();
						// 	const isComment = trimmed.startsWith('//') ||
						// 									trimmed.startsWith('#') ||
						// 									trimmed.startsWith('<!--');
						// 	return `<span class="${isComment ? 'cmt' : 'code-line'}">${line}</span>`;
						// }).join('\n');
					});
				}
			]
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
			entries: ['*', '/bytes']
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
