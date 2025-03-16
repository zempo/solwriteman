<script>
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import { audPlay } from '$lib/store/audio.svelte';
	import { main } from '$lib/store/main.svelte';
	import { getContext, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { pauseBtn, playBtn } from './audIcons';
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
		main.click();
		audIdx = idx;
	};
</script>

<!-- ?? player + tracklist container -->
<div class="aud_wrap">
	<div class="aud_header">
		{#key audIdx}
			<h3 in:fly={{ y: 20, duration: 300, opacity: 0 }}>{currAud.title}</h3>
		{/key}
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
		<Disclosure>
			{#snippet accH()}
				Expand Tracklist
			{/snippet}
			{#snippet accC()}
				<ul>
					{#each audData as A}
						{@render trackList(A)}
					{/each}
				</ul>
			{/snippet}
		</Disclosure>
	</div>
</div>

<!-- ??? AudBody -->
{#snippet audBody()}
	<div class="aud_stats">
		<span class="time">{audPlay.format(time)}</span>
		<label class="slider">
			<input
				type="range"
				name="track_prog"
				id="track_prog"
				min={0}
				max={duration}
				bind:value={time}
			/>
		</label>
		<span class="progress">{duration ? audPlay.format(duration) : '--:--'}</span>
	</div>
	<div class="aud_controls">
		<button class="aud_btn aud_btn_play" onclick={() => (paused = !paused)}>
			{#if paused}{@html playBtn}{:else}{@html pauseBtn}{/if}
		</button>
	</div>
{/snippet}

<!-- ??? TrackList -->
{#snippet trackList(A)}
	<li class={`aud_item`}>
		<button
			class={`track_btn ${A._id === audIdx ? 'is_curr_aud' : ''}`}
			onclick={() => selectTrack(A._id)}
		>
			{A.title}
		</button>
	</li>
{/snippet}
