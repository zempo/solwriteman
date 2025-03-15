<script>
	import { audPlay } from '$lib/store/audio.svelte';

	let { audData, selectedAud = 0 } = $props();
	const { type, title, src, timestamps, notes } = audData[selectedAud];
	let playState = $state({
		time: 0,
		duration: 0,
		paused: true
	});
	// src,title,type,timestamps,notes

	//  getAllContexts
</script>

<!-- player + tracklist container -->
<div class="aud_wrap">
	<div class="aud_header">
		<h3>{title}</h3>
	</div>
	<div class="aud_player">
		<audio {src}></audio>
		{@render audBody()}
	</div>
	<div class="aud_tracklist">
		<ul>
			{#each audData as A}{@render trackList(A)}{/each}
		</ul>
	</div>
</div>

<!-- ??? AudBody -->
{#snippet audBody()}
	<div class="aud_stats">
		<span class="time">{audPlay.format(playState.time)}</span>
		<div class="slider"></div>
		<span class="progress"></span>
	</div>
	<div class="aud_controls">
		<button>Play</button>
	</div>
{/snippet}

<!-- ??? TrackList -->
{#snippet trackList(A)}
	<li class={`aud_item is_selected_aud?`}>
		<button class="track_btn">
			{A.title}
		</button>
	</li>
{/snippet}
