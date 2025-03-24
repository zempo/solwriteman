<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);

	// export let id = 0;
	const { id = 0, children } = $props();

	const handleClick = () => {
		selectTab(tab);
		const panelSection = document.getElementById(`tabs_scroll`);

		// if (panelSection) {
		// 	panelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		// }
	};
</script>

<button
	role="tab"
	id="tab_{id}"
	aria-selected={$selectedTab === tab}
	class:selected={$selectedTab === tab}
	onclick={() => handleClick()}
>
	{@render children()}
</button>
