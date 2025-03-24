<script module>
	export const TABS = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import Panel from './TabPanel.svelte';
	import List from './TabList.svelte';
	import Tab from './Tab.svelte';
	import NextTab from './NextTab.svelte';
	import { main } from '$lib/store/main.svelte';

	export let tabType = 'tabs_standard';

	const T = {
		Tab,
		NextTab,
		Panel,
		List
	};

	const tabs = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS, {
		tabs,
		panels,
		registerTab: (tab) => {
			tabs.push(tab);
			selectedTab.update((current) => current || tab);

			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				selectedTab.update((current) =>
					current === tab ? tabs[i] || tabs[tabs.length - 1] : current
				);
			});
		},

		registerPanel: (panel) => {
			panels.push(panel);
			selectedPanel.update((current) => current || panel);

			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update((current) =>
					current === panel ? panels[i] || panels[panels.length - 1] : current
				);
			});
		},

		selectTab: (tab) => {
			main.click();
			const i = tabs.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},
		selectNextTab: () => {
			selectedTab.update((current) => {
				const index = tabs.indexOf(current);
				return tabs[(index + 1) % tabs.length];
			});
			selectedPanel.update((current) => {
				const index = panels.indexOf(current);
				return panels[(index + 1) % panels.length];
			});
		},
		selectedTab,
		selectedPanel
	});
</script>

<div class="tabs {tabType}" id="tabs_scroll">
	<slot {T} />
</div>
