<script>
	import { getContext, setContext } from 'svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import {
		backBtn,
		fwdBtn,
		pauseBtn,
		playbackWalk,
		playBtn,
		repeatBtn,
		repeatBtnOn
	} from './audIcons';
	import { audPlay } from '$lib/store/audio.svelte';
	import { fade, fly } from 'svelte/transition';
	import { main } from '$lib/store/main.svelte';

	let { audData, audIdx = 0 } = $props();
	let currAud = $state(audData[audIdx]);

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
			loop={audPlay.loop}
			bind:currentTime={audPlay.time}
			bind:duration={audPlay.duration}
			bind:paused={audPlay.paused}
			bind:muted={audPlay.muted}
			bind:playbackRate={audPlay.playbackRate}
			onended={() => (audPlay.time = 0)}
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
		<span class="time">{audPlay.format(audPlay.time)}</span>
		<label class="slider">
			<input
				type="range"
				name="track_prog"
				id="track_prog"
				min={0}
				max={audPlay.duration}
				bind:value={audPlay.time}
			/>
		</label>
		<span class="progress">{audPlay.duration ? audPlay.format(audPlay.duration) : '--:--'}</span>
	</div>
	<div class="aud_controls">
		<div class="btn_grp btn_grp_l">
			<button class="aud_btn aud_btn_loop">
				{@html repeatBtn}
			</button>
		</div>
		<div class="btn_grp btn_grp_m">
			<button
				class="aud_btn aud_btn_back"
				aria-label="Back ten seconds"
				onclick={() => audPlay.setSeek(-10)}>{@html backBtn} 10</button
			>
			<button
				class="aud_btn aud_btn_play"
				onclick={() => audPlay.togglePause()}
				aria-label={audPlay.paused == true ? 'Play track' : 'Pause track'}
			>
				{#if audPlay.paused}{@html playBtn}{:else}{@html pauseBtn}{/if}
			</button>
			<button
				class="aud_btn aud_btn_fwd"
				aria-label="Seek ten seconds"
				onclick={() => audPlay.setSeek(10)}>10 {@html fwdBtn}</button
			>
		</div>
		<div class="btn_grp btn_grp_r">
			<button class="aud_btn aud_btn_rate">
				{@html playbackWalk} <span class="playback_lbl">1x</span>
			</button>
		</div>
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
