/**
 * !!!!!! return {byYear: byYear.reverse(),}
 * 
  let byYear = [];
	let searchStrs = [];
	// year slots
	for (let y = 0; y < blogYears; y++) {
		byYear.push([]);
	}

 		for (let i = 0; i < blogYears; i++) {
			let currYr = 2025 + i;
			if (s.created_at.includes(currYr)) {
				byYear[i].push({
					title: s.title,
					slug: s.slug,
					created_at: s.created_at,
					excerpt: s.excerpt,
					topics: s.topics ?? [],
					pinned: s.pinned ?? false
				});
			}
		} 
 !! * !!! return      		byYear: byYear.reverse(),
 *
 * **/

export function organizeByYear(articles, index = 0, result = {}, years = new Set()) {
	// Base case: when we've processed all articles
	if (index >= articles.length) {
		// Convert the Set to an array and sort in descending order
		const sortedYears = Array.from(years).sort((a, b) => b - a);

		// Return both the organized articles and the unique years
		return {
			organized: Object.keys(result)
				.sort((a, b) => parseInt(b) - parseInt(a))
				.map((year) => result[year]),
			years: sortedYears
		};
	}

	const article = articles[index];
	// Extract the year from the date
	const year = article.date.split('-')[2];

	// Add the year to our Set (automatically handles uniqueness)
	years.add(year);

	// Initialize the year array if it doesn't exist
	if (!result[year]) {
		result[year] = [];
	}

	// Add the current article to its year array
	result[year].push(article);

	// Recursive call to process the next article
	return organizeByYear(articles, index + 1, result, years);
}
