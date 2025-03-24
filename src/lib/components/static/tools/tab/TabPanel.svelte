<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);

	export let id = 0;
	export let panelType = 'regular_wrap';

	const transitionIn = { easing: cubicIn, duration: 400 };
	// const transitionOut = { easing: cubicIn, duration: 300 };
</script>

{#if $selectedPanel === panel}
	<div role="tabpanel" aria-labelledby="tab_{id}" id="panel_{id}" class="tab_panel">
		<div class={`content_wrapper ${panelType} panel_content_anchor`} in:fade={transitionIn}>
			<slot />
		</div>
	</div>
{/if}
