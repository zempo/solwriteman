<script>
	import { organizeByYear } from '$lib/components/content/helpers/snippet.js';
	import { pinnedSnips, poemSnips, lifeSnips, techSnips } from '$lib/store/data/snipData.js';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import TypeWriter from '$lib/components/static/comp_lib/TypeWriter.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import { seoData } from '$lib/config';
	import { onMount } from 'svelte';

	let pinOrg = null;
	let poemOrg = null;
	let lifeOrg = null;
	let techOrg = null;
	onMount(() => {
		pinOrg = organizeByYear(pinnedSnips);
		poemOrg = organizeByYear(poemSnips);
		lifeOrg = organizeByYear(lifeSnips);
		techOrg = organizeByYear(techSnips);
		console.log(pinOrg);
	});
</script>

<!-- *If label != 0, single table, different title -->
{#snippet snipTable(S, label = 0)}
	{#if S.organized}
		{#each S.organized as T, idx}
			<table class="snip_table">
				<thead>
					<tr>
						<th class="use_h4">{label === 0 ? S.years[idx] : label}</th>
					</tr>
				</thead>
			</table>
		{/each}
	{/if}
{/snippet}

{#snippet snipTablePin(S, label)}
	<table class="snip_table">
		<thead>
			<tr>
				<th class="use_h4">{label}</th>
			</tr>
		</thead>
	</table>
{/snippet}

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
				{@render snipTablePin(pinnedSnips, 'Featured')}
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}Prose & Poems{/snippet}
			{#snippet accC()}
				{@render snipTable(poemOrg)}
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}Worth / Life Balance{/snippet}
			{#snippet accC()}
				{@render snipTable(lifeOrg)}
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}Tech Talk{/snippet}
			{#snippet accC()}
				{@render snipTable(techOrg)}
			{/snippet}
		</Disclosure>
	</div>
</PgWrap>
