<script>
	import { getContext, onMount, setContext } from 'svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import {
		backBtn,
		fwdBtn,
		pauseBtn,
		muteIcon,
		downloadIcon,
		playbackSnail,
		playbackSprint,
		playbackWalk,
		playBtn,
		repeatBtn,
		repeatBtnOn,
		volumeIcon,
		transcriptIcon
	} from './audIcons';
	import { audPlay, getAUD } from '$lib/store/audio.svelte';
	import { fade, fly } from 'svelte/transition';
	import { main } from '$lib/store/main.svelte';
	import { truncate } from '../../utils/helpers';
	import { dimension } from '$lib/store/dimension.svelte';

	let { audData, audIdx = 0 } = $props();
	let currAud = $state(audData[audIdx]);
	let audRef;
	let muted = $state(false);
	let paused = $state(true);
	let time = $state(0);
	let duration = $state(0);
	let loop = $state(false);
	let notesOpen = $state(false);
	let playbackRate = $state(1);
	let playbackNext = $state(2);
	let playbackIdx = $state(0);

	$effect(() => {
		currAud = audData[audIdx];
	});

	const selectTrack = (idx) => {
		main.click();
		notesOpen = false;
		duration = 0;
		if (paused === false) {
			paused = true;
			time = 0;
		}
		audIdx = idx;
		if (loop === false) {
			audRef.onloadedmetadata = () => {
				paused = false;
			};
		}
	};

	const endTrack = () => {
		let len = audData.length - 1;
		let next = len === audIdx ? 0 : audIdx + 1;
		time = 0;
		notesOpen = false;
		if (loop === false) {
			audIdx = next;
			audRef.onloadedmetadata = () => {
				paused = false;
			};
		}
	};

	const setSeek = (seek) => {
		let max = time + seek;
		if (seek < 0) {
			if (max <= 0) time = 0;
			else time -= Math.abs(seek);
		} else {
			if (max >= duration) time = duration;
			else time += seek;
		}
	};

	const togglePlayback = () => {
		let speedsRef = [1.0, 2.0, 0.5];
		if (playbackIdx === 0) {
			playbackIdx = 1;
			playbackNext = speedsRef[2];
		} else if (playbackIdx === 1) {
			playbackIdx = 2;
			playbackNext = speedsRef[0];
		} else {
			playbackIdx = 0;
			playbackNext = speedsRef[1];
		}
		playbackRate = speedsRef[playbackIdx];
	};
</script>

<!-- ?? player + tracklist container -->
<div class="aud_wrap">
	<div class="aud_header">
		{@render audHeader()}
	</div>
	<div class="aud_player">
		<audio
			src={currAud.src}
			{loop}
			bind:currentTime={time}
			bind:duration
			bind:paused
			bind:muted
			bind:playbackRate
			bind:this={audRef}
			onended={() => endTrack()}
		></audio>
		{@render audBody()}
	</div>
	<div class="aud_tracklist">
		<Disclosure>
			{#snippet accH()}
				View Tracks
			{/snippet}
			{#snippet accC()}
				<ul>
					{#each audData as A, idx}
						{@render trackList(A, idx)}
					{/each}
				</ul>
			{/snippet}
		</Disclosure>
	</div>
</div>

<!-- ??? AudHead -->
{#snippet audHeader()}
	{#key audIdx}
		<h3 in:fly={{ y: 20, duration: 300, opacity: 0 }}>
			{truncate(currAud.title, dimension.trunc1, '...')}
		</h3>
	{/key}
	<div class="aud_utils" role="toolbar" aria-label="playback utility controls">
		<button
			class="aud_btn aud_btn_vol {muted ? 'mute_on' : ''}"
			title="{muted ? 'Unmute' : 'Mute'} Track"
			onclick={() => (muted = !muted)}
		>
			{#if muted}{@html muteIcon}{:else}{@html volumeIcon}{/if}
		</button>
		<button
			class="aud_btn aud_btn_notes"
			title="{notesOpen ? 'Hide' : 'Show'} Notes"
			disabled={currAud.notes[0] === ''}
		>
			{@html transcriptIcon}
		</button>
		<a
			class="aud_btn aud_btn_download"
			role="button"
			title="Download Track"
			href={currAud.src}
			target="_blank"
			rel="noopener noreferrer"
			download
		>
			{@html downloadIcon}
		</a>
	</div>
{/snippet}

<!-- ??? AudBody -->
{#snippet audBody()}
	<div class="aud_stats">
		<span class="time">{audPlay.format(time)}</span>
		<label class="slider">
			<div class="timestamps">
				{#each currAud.timestamps as A}
					{#key duration > 0}
						<span
							class="t_stamp"
							aria-hidden="true"
							title={A.info}
							in:fade={{ duration: 300, opacity: 0 }}
							style={`display: ${duration > 0 ? 'inline-block;opacity:1;' : 'none;opacity:0;'}left:${A.pt * (100 / duration)}%`}
						></span>
					{/key}
				{/each}
			</div>
			<input
				type="range"
				name="track_prog"
				id="track_prog"
				list="timestamps"
				min={0}
				max={duration}
				bind:value={time}
			/>
		</label>
		<span class="progress">{duration ? audPlay.format(duration) : '--:--'}</span>
	</div>
	<div class="aud_controls" role="toolbar" aria-label="playback controls">
		<div class="btn_grp btn_grp_l">
			<button
				class="aud_btn aud_btn_loop {loop ? 'loop_on' : ''}"
				onclick={() => (loop = !loop)}
				title="Turn Loop {loop === false ? 'On' : 'Off'}"
			>
				{@html repeatBtn}
			</button>
		</div>
		<div class="btn_grp btn_grp_m">
			<button
				class="aud_btn aud_btn_back"
				aria-label="Back ten seconds"
				onclick={() => setSeek(-10)}>{@html backBtn} 10</button
			>
			<button
				class="aud_btn aud_btn_play"
				onclick={() => (paused = !paused)}
				aria-label={paused == true ? 'Play track' : 'Pause track'}
			>
				{#if paused}{@html playBtn}{:else}{@html pauseBtn}{/if}
			</button>
			<button class="aud_btn aud_btn_fwd" aria-label="Seek ten seconds" onclick={() => setSeek(10)}
				>10 {@html fwdBtn}</button
			>
		</div>
		<div class="btn_grp btn_grp_r">
			<button
				class="aud_btn aud_btn_rate"
				onclick={() => togglePlayback()}
				title="Set Speed {playbackNext}"
			>
				{#if playbackIdx < 2}{#if playbackIdx === 0}{@html playbackWalk}{:else}{@html playbackSprint}{/if}
				{:else}{@html playbackSnail}{/if}
				<span class="playback_lbl" aria-label="playback">{playbackRate}x</span>
			</button>
		</div>
	</div>
{/snippet}

<!-- ??? TrackList -->
{#snippet trackList(A, idx)}
	<li class={`aud_item`}>
		<button
			class={`track_btn ${idx === audIdx ? 'is_curr_aud' : ''}`}
			onclick={() => selectTrack(idx)}
		>
			{A.title}
		</button>
	</li>
{/snippet}
