<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';
	import ApiCard from '$lib/components/content/helpers/ApiCard.svelte';
	import { seoData } from '$lib/config';
	import { content } from '$lib/store/content.svelte.js';

	export let data;

	const { labs, kits } = data;
</script>

<PgHead pgData={seoData.bytes} />
<PgHero />
<Tabs let:T tabType="wide_tabs">
	{#snippet children(T)}
		<T.List>
			{#snippet children()}
				<T.Tab id={0}
					>{#snippet children()}
						<span
							class="tab_reg{content.byteTabStatus === 1 || content.byteTabStatus === 3
								? ' tab_hl'
								: ''}{content.tabLab ? ' tab_tag' : ''}"
						>
							Lab: Shaders &amp; Renders
						</span>{/snippet}</T.Tab
				>
				<T.Tab id={1}
					>{#snippet children()}<span
							class="tab_reg{content.byteTabStatus >= 2 ? ' tab_hl' : ''}{content.tabKit
								? ' tab_tag'
								: ''}">Kit: UI/UX & Templates</span
						>{/snippet}</T.Tab
				>
			{/snippet}
		</T.List>
		<T.Panel id={0} panelType="wide_panel">
			{#snippet children()}
				<ApiCard posts={labs} />
			{/snippet}
		</T.Panel>
		<T.Panel id={1}>
			{#snippet children()}
				<ApiCard type="kit" posts={kits} />
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
