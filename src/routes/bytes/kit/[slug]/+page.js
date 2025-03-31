import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const byte = await import(`$lib/components/content/kit/${params.slug}.svx`);

		return {
			byteContent: byte.default,
			byteMeta: { ...byte.metadata, slug: params.slug }
		};
	} catch (err) {
		error(404, err);
	}
}
