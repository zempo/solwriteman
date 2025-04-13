import { organizeByYear } from '../../components/content/helpers/snippet';

/**
 * TODO Sort array by date helper fxn
 *
 * Poems / Prose
 * Articles
 * Lorem is Ipsum (No, Really).
 *
 * 📚 Payhip (similar to Gumroad, even more discreet)
 * 📘 Gumroad (great for pseudonymous creators)
 * 📖 Amazon Kindle Direct Publishing (KDP)
 * 🌐 Itch.io (underrated for zine-style or experimental writing)
 *  - Originally built for indie games, but increasingly used by writers and artists.
 *  - You can create an anonymous storefront and sell zines, PDFs, ebooks.
 *  - The vibe is alt/indie—great if your writing is creative or hybrid (like poetry-meets-code, or visual/therapeutic metaphors).
 * * 🖥️ Ko-fi (similar to Patreon, but more casual)
 */
export const pinnedSnips = [
	{
		title: `Reflecting on Ten Years of Code`,
		src: `SubStack`,
		link: `https://joshcollinsworth.com/blog/ten-years-of-code`,
		date: `03-02-2025`
	},
	{
		title: `Work-From-Home Survival Guide`,
		src: `SubStack`,
		link: `https://www.youtube.com/watch?v=D7DNVX4iwFQ&ab_channel=blakeoftoday`,
		date: `02-12-2025`
	}
];

export const poemSnips = [
	{
		title: `Ten Years of Code`,
		src: `SubStack`,
		link: `https://joshcollinsworth.com/blog/ten-years-of-code`,
		date: `03-02-2025`
	},
	{
		title: `This or that`,
		src: `SubStack`,
		link: `https://www.youtube.com/watch?v=D7DNVX4iwFQ&ab_channel=blakeoftoday`,
		date: `04-1-2025`
	}
];

export const techSnips = [
	{
		title: `Reflecting on Ten Years of Code`,
		src: `SubStack`,
		link: `https://joshcollinsworth.com/blog/ten-years-of-code`,
		date: `03-02-2025`
	},
	{
		title: `Noticing Journal`,
		src: `SubStack`,
		link: `https://www.youtube.com/watch?v=D7DNVX4iwFQ&ab_channel=blakeoftoday`,
		date: `02-12-2025`
	},
	{
		title: `This or that`,
		src: `SubStack`,
		link: `https://www.youtube.com/watch?v=D7DNVX4iwFQ&ab_channel=blakeoftoday`,
		date: `04-1-2025`
	}
];

export const lifeSnips = [
	{
		title: `Work-From-Home Survival Guide`,
		src: `SubStack`,
		link: `https://joshcollinsworth.com/blog/ten-years-of-code`,
		date: `03-02-2025`
	},
	{
		title: `How to take a break (No, really)`,
		src: `SubStack`,
		link: `https://www.youtube.com/watch?v=D7DNVX4iwFQ&ab_channel=blakeoftoday`,
		date: `02-12-2025`
	}
];

// export const { poemOrg, poemYears } = organizeByYear(poemSnips);
// export const { techOrg, techYears } = organizeByYear(techSnips);
// export const { lifeOrg, lifeYears } = organizeByYear(lifeSnips);
