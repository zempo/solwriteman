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
		type: 0,
		title: `Audiobook / Poetry`,
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
	}
];

/* eslint-disable no-undef */
class AudPlay {
	time = $state(0);
	duration = $state(0);
	paused = $state(true);

	// format time (read time)
	format(T) {
		if (isNaN(T)) return `...`;

		const min = Math.floor(T / 60);
		const sec = Math.floor(T % 60);

		return `${min}:${sec < 10 ? `0${sec}` : sec}`;
	}

	// seek pos, read/write time
	seek(e) {
		const targetEl = e.currentTarget;

		if (targetEl) {
			const { left, width } = targetEl.getBoundingClientRect();

			let pos = (e.clientX - left) / width;
			if (pos < 0) pos = 0;
			if (pos > 1) pos = 1;

			this.time = p * duration;
		}
	}
}

export const audPlay = new AudPlay();
