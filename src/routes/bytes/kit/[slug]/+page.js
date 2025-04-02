import { error } from '@sveltejs/kit';
// import { compile } from 'mdsvex';
// import { createProcessor } from 'mdsvex';
import { lintCode } from '$lib/remarkHelpers.js';

export async function load({ params }) {
	try {
		const byte = await import(`$lib/components/content/kit/${params.slug}.svx`);

		// 2. Dynamically import mdsvex (ESM workaround)
		// const { compile } = await import('mdsvex');
		// const processByte = await compile(byte.default, {
		// 	remarkPlugins: [lintCode]
		// });
		// console.log(processByte);

		return {
			byteContent: byte.default,
			byteMeta: { ...byte.metadata, slug: params.slug }
		};
	} catch (err) {
		error(404, err);
	}
}
