import { setContext, getContext } from 'svelte';
import { main } from './main.svelte';

// **********************************************************************************
// **********************************************************************************
export const getAUD = (KEY) => {
	return getContext(KEY);
};

/* eslint-disable no-undef */
class AudPlay {
	time = $state(0);
	duration = $state(0);
	loop = $state(false);
	muted = $state(false);
	paused = $state(true);
	notesOpen = $state(false);
	playbackRate = $state(1);
	playbackNext = $state(2);
	playbackIdx = $state(0);

	// loopRef = $state(0);
	// playbackRef = $state(0);

	getAud(KEY) {
		return getContext(KEY);
	}

	initAud() {
		setContext('paused', this.paused);
	}

	selectTrack(idx, idxNew) {
		idx = idxNew;
	}

	togglePause() {
		this.paused = !this.paused;
	}

	toggleLoop() {
		this.loop = !this.loop;
		// this.loopRef.focus();
	}

	toggleMute() {
		main.click();
		this.muted = !this.muted;
	}

	togglePlayback() {
		let speedsRef = [1.0, 2.0, 0.5];
		if (this.playbackIdx === 0) {
			this.playbackIdx = 1;
			this.playbackNext = speedsRef[2];
		} else if (this.playbackIdx === 1) {
			this.playbackIdx = 2;
			this.playbackNext = speedsRef[0];
		} else {
			this.playbackIdx = 0;
			this.playbackNext = speedsRef[1];
		}
		this.playbackRate = speedsRef[this.playbackIdx];
	}

	trackReset() {
		this.time = 0;
		this.notesOpen = false;
	}

	selectReset() {
		this.notesOpen = false;
		this.duration = 0;
		if (this.paused === false) {
			this.paused = true;
			this.time = 0;
		}
	}

	trackAutoplay() {
		this.paused = false;
	}

	format(T) {
		if (isNaN(T)) return `...`;

		const min = Math.floor(T / 60);
		const sec = Math.floor(T % 60);

		return `${min}:${sec < 10 ? `0${sec}` : sec}`;
	}

	setSeek(seek) {
		let max = this.time + seek;
		if (seek < 0) {
			if (max <= 0) this.time = 0;
			else this.time -= Math.abs(seek);
		} else {
			if (max >= this.duration) this.time = this.duration;
			else this.time += seek;
		}
	}
}

export const audPlay = new AudPlay();
