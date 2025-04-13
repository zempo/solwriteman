// Sort by date (ascending: oldest first)
export const sortedByDateAsc = (snips) =>
	[...snips].sort((a, b) => {
		const parseDate = (dateStr) => {
			const [month, day, year] = dateStr.split('-').map(Number);
			return new Date(year, month - 1, day); // Month is 0-indexed in JS
		};

		const dateA = parseDate(a.date);
		const dateB = parseDate(b.date);
		return dateA - dateB; // Newest first
	});

// Sort by date (descending: newest first)
export const sortedByDateDesc = (snips) =>
	[...snips].sort((a, b) => {
		const parseDate = (dateStr) => {
			const [month, day, year] = dateStr.split('-').map(Number);
			return new Date(year, month - 1, day); // Month is 0-indexed in JS
		};

		const dateA = parseDate(a.date);
		const dateB = parseDate(b.date);
		return dateB - dateA; // Newest first
	});

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
