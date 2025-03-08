<script>
	// let isOpen = $state(false);
	let { accH, accC, isOpen = false } = $props();
</script>

<div class="content_disclosure">
	<button
		aria-expanded={isOpen}
		aria-controls="disclosure-content"
		onclick={() => (isOpen = !isOpen)}
		class="disclosure-button"
	>
		{#if accH}
			{@render accH()}
		{/if}
		<span class="icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
	</button>
	<div
		id="disclosure-content"
		role="region"
		aria-hidden={!isOpen}
		hidden={!isOpen}
		class="disclosure-content"
	>
		{#if accC}
			{@render accC()}
		{/if}
	</div>
</div>
