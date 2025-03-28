<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';
	import ApiCard from '$lib/components/content/helpers/ApiCard.svelte';
	import { seoData } from '$lib/config';

	export let data;

	const {
		labs,
		topicsLab,
		searchLab,
		pinnedLab,
		countLab,
		kits,
		topicsKit,
		searchKit,
		pinnedKit,
		countKit
	} = data;
</script>

<PgHead pgData={seoData.bytes} />
<PgHero>{#snippet regHero()}{/snippet}</PgHero>
<Tabs let:T tabType="wide_tabs">
	{#snippet children(T)}
		<T.List>
			{#snippet children()}
				<T.Tab id={0}>{#snippet children()}Lab: Art / Shaders / Renders{/snippet}</T.Tab>
				<T.Tab id={1}>{#snippet children()}Kit: UI for a UX Guy{/snippet}</T.Tab>
			{/snippet}
		</T.List>
		<T.Panel id={0} panelType="wide_panel">
			{#snippet children()}
				<ApiCard content={labs} />
			{/snippet}
		</T.Panel>
		<T.Panel id={1}>
			{#snippet children()}
				<ApiCard type="kit" content={kits} />
			{/snippet}
		</T.Panel>
	{/snippet}
</Tabs>
<!-- 
	bytes:

	onclick opens

	copy code / image preview / notes .svx (no code linting)

	bytes/

	bytes/kit/this_component

	bytes/lab/this_shader or render (image)

	https://www.w3.org/WAI/ARIA/apg/patterns/
	-->
