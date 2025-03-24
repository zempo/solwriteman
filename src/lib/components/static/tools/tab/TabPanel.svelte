<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);

	// export let id = 0;
	// export let panelType = 'regular_wrap';
	const { id = 0, panelType = 'regular_wrap', children } = $props();

	const transitionIn = { easing: cubicIn, duration: 400 };
</script>

{#if $selectedPanel === panel}
	<div role="tabpanel" aria-labelledby="tab_{id}" id="panel_{id}" class="tab_panel">
		<div class={`content_wrapper ${panelType} panel_content_anchor`} in:fade={transitionIn}>
			{@render children()}
		</div>
	</div>
{/if}
