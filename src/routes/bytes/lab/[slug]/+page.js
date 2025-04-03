import { error } from '@sveltejs/kit';
export const prerender = false;
export const ssr = false;

export async function load({ params }) {
	try {
		const byte = await import(`$lib/components/content/lab/${params.slug}.svx`);

		return {
			byteContent: byte.default,
			byteMeta: { ...byte.metadata, slug: params.slug }
		};
	} catch (err) {
		error(404, err);
	}
}
