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
		notes: [`Main niche.`]
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
		notes: [`Brainz is an entirely ficticious educational product.`]
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
		notes: [`This is a passion project. For more info, visit www.indieproject.com.`]
	}
];
