// For Number of Tables
export const thisYear = Number(new Date().getFullYear());
export const blogYears = thisYear - 2025 + 1;

export const getAllTopics = (posts) => {
	const uniqueTopics = [...new Set(posts.map((s) => s.topics).flat())];
	return uniqueTopics;
};

// TODO Create hash map for lab and kit-based posts
export const combineTopics = (...topics) => {
	const combined_topics = [].concat(...topics);
	const unique_topics = [...new Set(combined_topics)];

	return unique_topics;
};

// combine two object arrays and return a new object array
export const combineObjArrays = (arr1, arr2) => {
	const combined = [...arr1, ...arr2];
	const unique = Array.from(new Set(combined.map((item) => item.slug))).map((slug) =>
		combined.find((item) => item.slug === slug)
	);

	return unique;
};

// Your existing safeParseDate function
const safeParseDate = (dateStr) => {
	const parts = dateStr.split('-');
	return new Date(parts[2], parts[0] - 1, parts[1]);
};

export const getAccessibleDate = (dateStr) => {
	const date = safeParseDate(dateStr);
	if (isNaN(date.getTime())) return 'Invalid Date';

	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
	return date.toLocaleDateString('en-US', options); // "February 12, 2025"
};

export const getOrdinal = (num) => {
	var s = ['th', 'st', 'nd', 'rd'];
	var v = num % 100;
	return `${num}<sup>${s[(v - 20) % 10] || s[v] || s[0]}</sup>`;
};

export const formatTimestamp = (dateStr) => {
	// Safely parse date (works for MM-DD-YYYY, YYYY-MM-DD, etc.)
	const parseDate = (str) => {
		const [month, day, year] = str.split('-').map(Number);
		return new Date(year, month - 1, day); // month is 0-indexed
	};

	const date = parseDate(dateStr); // Use manual parsing instead of `new Date(isoStr)`

	// Format as "Mar 2nd", "Apr 1st", etc.
	const opts = { month: 'short', day: 'numeric' };
	const formatted = date.toLocaleDateString('en-US', opts);

	// Add ordinal suffix (e.g., "2" → "2nd")
	const [month, day] = formatted.split(' ');
	const dayWithOrdinal = `${getOrdinal(Number(day))}`;

	return `${month} ${dayWithOrdinal}`;
};

export const formatTimestampLong = (isoStr) => {
	// Split the ISO string to get just the date part
	const datePart = isoStr.split('T')[0];
	const [year, month, day] = datePart.split('-').map(Number);

	// Create date in local timezone
	const date = new Date(year, month - 1, day);

	const opts = { month: 'long', day: 'numeric', year: 'numeric' };
	let dateNumeric = date.toLocaleDateString('en-US', opts);
	let dateNumericStrs = dateNumeric.split(' ');
	let dayLen = dateNumericStrs[1].length;
	let dateOrdinal = `${dateNumericStrs[0]} ${getOrdinal(dateNumericStrs[1].substring(0, dayLen - 1))}, ${dateNumericStrs[2]}`;

	return dateOrdinal;
};

export const detectUserDateFormat = () => {
	const formatter = new Intl.DateTimeFormat(undefined, {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric'
	});
	const parts = formatter.formatToParts(new Date(2023, 7, 9)); // August 9, 2023

	const formatOrder = parts.map((part) => part.type).join('-');

	if (formatOrder.startsWith('month-day')) {
		return 1;
	} else if (formatOrder.startsWith('day-month')) {
		return 2;
	} else {
		return 1;
	}
};

export const formatTimestampAbbrv = (isoStr) => {
	// Safely parse the date string (works for MM-DD-YYYY, YYYY-MM-DD, etc.)
	const parseDate = (str) => {
		// Try ISO format first (YYYY-MM-DD)
		if (str.includes('-')) {
			const parts = str.split('-');
			// If year is first (ISO format)
			if (parts[0].length === 4) {
				return new Date(parts[0], parts[1] - 1, parts[2]);
			}
			// If month is first (MM-DD-YYYY)
			return new Date(parts[2], parts[0] - 1, parts[1]);
		}
		// Fallback to Date constructor (may still fail in Safari)
		return new Date(str);
	};

	const date = parseDate(isoStr);

	if (isNaN(date.getTime())) {
		console.error('Invalid date:', isoStr);
		return 'Invalid Date';
	}

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = String(date.getFullYear()).slice(-2); // Get last two digits

	return detectUserDateFormat() === 1
		? `${month}/${day}/${year}` // US format (MM/DD/YY)
		: `${day}/${month}/${year}`; // Non-US format (DD/MM/YY)
};

export const getRandIdx = (len) => {
	// Get the first random index
	let idx_1 = Math.floor(Math.random() * len);

	// Get the second random index, making sure it's different from the first
	let idx_2;
	do {
		idx_2 = Math.floor(Math.random() * len);
	} while (idx_2 === idx_1);

	let idx_3;
	do {
		idx_3 = Math.floor(Math.random() * len);
	} while (idx_3 === idx_2 || idx_3 === idx_1);

	return [idx_1, idx_2, idx_3];
};

export const nextIdx = (idx, len) => {
	let l = len;
	if (idx === l - 1) {
		return 0;
	}
	return idx + 1;
};

export const toFloat = (n) => {
	return 1.0 * n;
};

export const getRandTopics = (currTopics, allTopics) => {
	let t_all = allTopics;
	let t_len = allTopics.length;
	let t_pg = currTopics;

	let t_rands = [];
	for (let i = 0; i < t_len; i++) {
		let t_curr = t_all[i];
		if (!t_pg.includes(t_curr)) {
			t_rands.push(t_curr);
		}
	}

	let t_rands_out = [];
	let t_rands_indices = getRandIdx(t_rands.length);
	for (let i_2 = 0; i_2 < 3; i_2++) {
		let t_rand_idx = t_rands_indices[i_2];
		t_rands_out.push(t_rands[t_rand_idx]);
	}
	return t_rands_out;
};
