<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import { seoData } from '$lib/config';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';

	export let data;

	const { labs, byYear, topics, searchStrs, pinned, count } = data;
</script>

<PgHead pgData={seoData.bytes} />
<PgMain>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
		<Tabs let:T tabType="wide_tabs">
			<T.List>
				<T.Tab id={0}>Lab: Art / Visuals / Figures</T.Tab>
				<T.Tab id={1}>Kit: Components / Packages</T.Tab>
			</T.List>
			<T.Panel id={0} panelType="wide_panel">
				<p>
					{count}
				</p>
			</T.Panel>
			<T.Panel id={1}>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ipsum enim nobis quibusdam.
					Excepturi reiciendis odit totam veritatis ducimus laborum esse reprehenderit, dignissimos
					velit, maxime minima quos, eum magnam placeat illo quo? Id enim magni suscipit assumenda!
					Iste quam, fugit esse maxime harum molestias nihil eveniet quasi! Exercitationem facere,
					beatae est non illum nobis adipisci nihil incidunt magni, doloribus excepturi nulla
					deserunt reprehenderit, fugiat vitae. In nisi commodi ex soluta accusamus quisquam, itaque
					quia quidem provident facilis consequuntur ipsum, beatae dolores. Recusandae expedita unde
					quas! Possimus aut ducimus voluptatibus deleniti veniam blanditiis eius, commodi saepe
					quo, harum accusantium error incidunt?
				</p>
			</T.Panel>
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
