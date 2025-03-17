<script>
	import { main } from '$lib/store/main.svelte';
	import { onMount } from 'svelte';
	import { fontIcon, fontIconOn, moonIcon, scrollIcon, sunIcon } from '../svg/theme';
	import { dimension } from '$lib/store/dimension.svelte';

	onMount(() => {
		main.selectedTheme = main.getTheme();
	});
</script>

<ul class="site_controls" aria-label="Toggle Site settings">
	<li>
		<button class="ctrl_btn" onclick={() => main.setTheme()} title={main.selectedTheme.toolTip}>
			{#if main.selectedTheme.name == 'light'}
				{@html moonIcon}
			{:else}
				{@html sunIcon}
			{/if}
		</button>
	</li>
	<li>
		<button
			class="settings_btn font_btn"
			onclick={() => main.setFont()}
			aria-label="Toggle Dyslexia Font"
		>
			{#if main.dyslexicOn}
				{@html fontIconOn}
			{:else}
				{@html fontIcon}
			{/if}
		</button>
	</li>
	<li>
		<button
			class="settings_btn scrll_btn"
			title="Scroll to Top"
			onclick={() => dimension.scrollTop()}
		>
			{@html scrollIcon}
		</button>
	</li>
</ul>
