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
				'Git Commitment Issues',
				`e̸̻̒o̷̝͛e̴̦͘j̸̹́m̵͑͜l̷̪̚;̶͚͛s̵̘͐d̴̺̚ḟ̴̝s̸̯̀ḏ̸̏f̵̘̄ , am I right?`,
				`Oh! How you Opti-maze me, Eugene!`,
				'From Notes App to Table.',
				'Finding Virtual Wisdom',
				`Live. Laugh. Take Your Mandated Fifteen, Love.`,
				`Uh...42. Obviously.`,
				`Serving "Computed Unifying Network Tasks"`,
				`I've got 99 Warnings, but my Code Still Runs`,
				'Garbage Collection for the Soul',
				'Purge Burnout.exe?',
				`ARIA Grande, JSON Derulo, & Postgres Malone`,
				`Meryl Streep-Learning & Gordon RAM-sey`,
				'Debugging Fatherhood',
				'A Fork in the Road',
				'Snips of a Nerdy Niche',
				`It's not your Segmentation Fault (But responsibility)`
			]}
			minSpeed={30}
			maxSpeed={60}
			eraseSpeed={35}
			delay={600}
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
