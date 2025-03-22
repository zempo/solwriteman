<script>
	import { fade, slide } from 'svelte/transition';

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
	{#if isOpen}
		<div
			id="disclosure-content"
			role="region"
			aria-hidden={!isOpen}
			transition:slide={{ duration: 300, axis: 'y' }}
			class="disclosure-content"
		>
			<div class="fade_wrap" in:fade={{ duration: 350 }}>
				{#if accC}
					{@render accC()}
				{/if}
			</div>
		</div>
	{/if}
</div>
