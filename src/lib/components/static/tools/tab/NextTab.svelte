<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	// Get the TABS context
	const { selectNextTab } = getContext(TABS);

	function handleClick() {
		selectNextTab();
	}
</script>

<button on:click={handleClick} class="next_tab_button">Read More</button>

<style>
	.next_tab_button {
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		cursor: pointer;
	}
</style>
