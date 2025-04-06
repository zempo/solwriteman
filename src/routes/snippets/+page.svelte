<script>
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import TypeWriter from '$lib/components/static/comp_lib/TypeWriter.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.snippets} />
<PgWrap>
	<PgHero />
	<div class="snips_aside">
		<TypeWriter
			messages={[
				'From Notes App to Table',
				'Finding Virtual Wisdom',
				'Purge Burnout.exe?',
				'Debugging Fatherhood',
				'From a Nerdy Niche',
				'Not Your Segmentation Fault'
			]}
			minSpeed={30}
			maxSpeed={80}
			eraseSpeed={60}
			delay={500}
		/>
	</div>
	<div class="snip_panels">
		<Disclosure isOpen={true}>
			{#snippet accH()}Freshly Cut Snips{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}Prose & Poems{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}Worth / Life Balance{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
	</div>
	<!-- 
	snippets:

	snippets?this_tag (image preview / summary of external substack link)

	make table
	-->
</PgWrap>
