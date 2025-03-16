import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';

/**
 * *GET/SET
 */
export const getAUD = (KEY) => {
	return getContext(KEY);
};

export const toggle = (store) => {
	store.update((s) => !s);
};

export const set = (store, val) => {
	store.set(val);
};

export const incr = (store, val) => {
	store.update((s) => s + val);
};

export const decr = (store, val) => {
	store.update((s) => s - val);
};

/**
 * *AUDIO PROPS
 */
// let placeHolderURL = `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb8a0d9b4a570012f9af74.mp3`;

export const initFile = (currItem, initial) => {
	let trackIdx = writable(initial);
	let trackTitle = writable(currItem.name);

	// let transcript = writable(currItem.transcript);
	// let showTranscript = writable(false);
	let trackSrc = writable(currItem.url);
	let trackTimeStamps = writable(currItem.timeStamps);
	let duration = writable(0);
	let currentTime = writable(0);
	let ratio = writable(0);
	let ended = writable(false);

	setContext('trackIdx', trackIdx);
	setContext('trackTitle', trackTitle);
	setContext('trackSrc', trackSrc);
	setContext('trackTimeStamps', trackTimeStamps);
	// setContext('transcript', transcript);
	// setContext('showTranscript', showTranscript);
	setContext('duration', duration);
	setContext('currentTime', currentTime);
	setContext('ratio', ratio);
	setContext('ended', ended);
};

/**
 * *CONTROLS
 */
export const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
export const initControls = () => {
	let paused = writable(true);
	let playbackRate = writable(1);
	let playbackIdx = writable(3);
	let loopOn = writable(false);
	let muted = writable(false);
	let volume = writable(1);
	// Tracklist / Transcript / Download
	let tracklistOpen = writable(false);

	setContext('paused', paused);
	setContext('playbackIdx', playbackIdx);
	setContext('playbackRate', playbackRate);
	setContext('loopOn', loopOn);
	setContext('muted', muted);
	setContext('volume', volume);

	setContext('tracklistOpen', tracklistOpen);

	setContext(
		'playing',
		derived(paused, ($paused) => !$paused)
	);
};
