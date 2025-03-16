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
		_id: 0,
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
		notes: [`From the Riviting Lorem of Ipsum, by A Non Mous, comes an all new tale.`]
	},
	{
		_id: 1,
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
		notes: [`From the Riviting Lorem of Ipsum, by A Non Mous, comes an all new tale.`]
	},
	{
		_id: 2,
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
		notes: [`From the Riviting Lorem of Ipsum, by A Non Mous, comes an all new tale.`]
	},
	{
		_id: 3,
		title: `eLearning Demo`,
		src: `https://open.acast.com/public/streams/62bb6cbc21e4cb001212c5e7/episodes/62bb73e7e762370014e5f253.mp3`,
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
		notes: [`From the Riviting Lorem of Ipsum, by A Non Mous, comes an all new tale.`]
	}
];

/* eslint-disable no-undef */
class AudPlay {
	selectedAud = $state(0);
	time = $state(0);
	duration = $state(0);
	loop = $state(false);
	muted = $state(false);
	paused = $state(true);
	playbackRate = $state(1);

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
	}

	// format time (read time)
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
