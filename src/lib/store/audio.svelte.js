import { setContext, getContext } from 'svelte';

/**
 * *
 *  {
 *  ? type: array ['Audiobook / Poetry','Commercial','Character','Educational','TV/Promo']
 *  ? title: ``
 *  ? src: 'https://s3.amazonaws.com/assets.pippa.io/shows/62bb6cbc21e4cb001212c5e7/1656450274536-0ec761a2535d884a58ce4ad2085c2f5f.mp3'
 *  ?notes: [``] array of paragraphs about the track
 ** }
 * *
 *
 */
export const reelData = [
	{
		title: `Narration Demo`,
		// src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb73e7e762370014e5f253.mp3`,
		src: `https://sveltejs.github.io/assets/music/satie.mp3`,
		timestamps: [
			{
				pt: 10,
				label: `Crest Shadows`
			},
			{
				pt: 21,
				label: `Knight's Knob`
			}
		],
		notes: [``]
	},
	{
		title: `Commercial Demo`,
		src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb6ecccbcafc00132f0f54.mp3`,
		timestamps: [
			{
				pt: 24,
				label: `Crest`
			},
			{
				pt: 95,
				label: `Knight's Knob`
			}
		],
		notes: [``]
	},
	{
		title: `Character Demo`,
		src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb73e7e762370014e5f253.mp3`,
		timestamps: [
			{
				pt: 10,
				label: `Crest Shadows`
			},
			{
				pt: 45,
				label: `Knight's Knob`
			}
		],
		notes: [``]
	},
	{
		title: `eLearning Demo`,
		src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb6d2f21e4cb001212c7cd.mp3`,
		timestamps: [
			{
				pt: 40,
				label: `Crest Shadows`
			},
			{
				pt: 95,
				label: `Knight's Knob`
			}
		],
		notes: [``]
	},
	{
		title: `TV / Promo Demo`,
		src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb8940e762370014e64722.mp3`,
		timestamps: [
			{
				pt: 40,
				label: `Crest Shadows`
			},
			{
				pt: 95,
				label: `Knight's Knob`
			}
		],
		notes: [``]
	}
];

// **********************************************************************************
// **********************************************************************************
/* eslint-disable no-undef */
class AudPlay {
	time = $state(0);
	duration = $state(0);
	loop = $state(false);
	muted = $state(false);
	paused = $state(true);
	playbackRate = $state(1);
	playbackNext = $state(2);
	playbackIdx = $state(0);

	loopRef = $state(0);
	playbackRef = $state(0);

	getAud(KEY) {
		return getContext(KEY);
	}

	setAud(audFile, audIdx) {
		setContext('audIdx', audIdx);
		setContext('audFile', audFile);
		return '';
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
		// this.playbackRef.focus();
	}

	trackReset() {
		this.time = 0;
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
