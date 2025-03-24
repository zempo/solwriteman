<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import { seoData } from '$lib/config';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';

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
<PgMain>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
		<Tabs let:T tabType="wide_tabs">
			{#snippet children(T)}
				<T.List>
					{#snippet children()}
						<T.Tab id={0}>{#snippet children()}Lab: Art / Visuals / Figures{/snippet}</T.Tab>
						<T.Tab id={1}>{#snippet children()}Kit: Components / Packages{/snippet}</T.Tab>
					{/snippet}
				</T.List>
				<T.Panel id={0} panelType="wide_panel">
					{#snippet children()}
						<p>
							{countLab}
							{countKit}
						</p>
					{/snippet}
				</T.Panel>
				<T.Panel id={1}>
					{#snippet children()}
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ipsum enim nobis
							quibusdam. Excepturi reiciendis odit totam veritatis ducimus laborum esse
							reprehenderit, dignissimos velit, maxime minima quos, eum magnam placeat illo quo? Id
							enim magni suscipit assumenda! Iste quam, fugit esse maxime harum molestias nihil
							eveniet quasi! Exercitationem facere, beatae est non illum nobis adipisci nihil
							incidunt magni, doloribus excepturi nulla deserunt reprehenderit, fugiat vitae. In
							nisi commodi ex soluta accusamus quisquam, itaque quia quidem provident facilis
							consequuntur ipsum, beatae dolores. Recusandae expedita unde quas! Possimus aut
							ducimus voluptatibus deleniti veniam blanditiis eius, commodi saepe quo, harum
							accusantium error incidunt?
						</p>
					{/snippet}
				</T.Panel>
			{/snippet}
		</Tabs>
	</section>
	<!-- 
	bytes:

	onclick opens

	copy code / image preview / notes .svx (no code linting)

	bytes/

	bytes/kit/this_component

	bytes/lab/this_shader or render (image)

	https://www.w3.org/WAI/ARIA/apg/patterns/
	-->
</PgMain>
