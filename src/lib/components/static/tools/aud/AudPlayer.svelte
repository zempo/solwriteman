<script>
	import { audPlay } from '$lib/store/audio.svelte';

	let { audData, selectedAud = 0 } = $props();
	const { type, title, src, timestamps, notes } = audData[selectedAud];
	// src,title,type,timestamps,notes

	//  getAllContexts
</script>

<!-- player + tracklist container -->
<div class="aud_wrap">
	<div class="aud_header">
		<h2>{title}</h2>
	</div>
	{audPlay.setAud(audData, selectedAud)}
	<div class="aud_player">
		<div class="aud_stats">
			<span class="time"></span>
			<div class="slider"></div>
			<div class="progress"></div>
		</div>
		<div class="aud_controls">
			<button>Play</button>
		</div>
	</div>
	<div class="aud_tracklist">
		<ul>
			{#each audData as A}
				{@render trackList(A)}
			{/each}
		</ul>
	</div>
</div>

{#snippet trackList(A)}
	<li class={`aud_item is_selected_aud?`}>
		{A.title}
	</li>
{/snippet}
