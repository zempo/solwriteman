<script>
	import { audPlay } from '$lib/store/audio.svelte';
	import { getContext, setContext } from 'svelte';
	// import { getAUD, initControls, initFile, set } from './audioContext';
	// import { onMount } from 'svelte';

	let { audData, audIdx = 0 } = $props();
	let currAud = $state(audData[audIdx]);
	let time = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	// { _id, type, title, src, timestamps, notes }
	// src,title,type,timestamps,notes

	$effect(() => {
		currAud = audData[audIdx];
	});

	const selectTrack = (idx) => {
		audIdx = idx;
	};
</script>

<!-- ?? player + tracklist container -->
<div class="aud_wrap">
	<div class="aud_header">
		<h3>{currAud.title}</h3>
	</div>
	<div class="aud_player">
		<audio
			src={currAud.src}
			bind:currentTime={time}
			bind:duration
			bind:paused
			onended={() => (time = 0)}
		></audio>
		{@render audBody()}
	</div>
	<div class="aud_tracklist">
		<ul>
			{#each audData as A}
				{@render trackList(A)}
			{/each}
		</ul>
	</div>
</div>

<!-- ??? AudBody -->
{#snippet audBody()}
	<div class="aud_stats">
		<span class="time">{audPlay.format(time)}</span>
		<div class="slider"></div>
		<span class="progress">{duration ? audPlay.format(duration) : '--:--'}</span>
	</div>
	<div class="aud_controls">
		<button onclick={() => (paused = !paused)}>Play</button>
	</div>
{/snippet}

<!-- ??? TrackList -->
{#snippet trackList(A)}
	<li class={`aud_item is_selected_aud?`}>
		<button class="track_btn" onclick={() => selectTrack(A._id)}>
			{A.title}
		</button>
	</li>
{/snippet}
