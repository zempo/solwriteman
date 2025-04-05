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

export const getOrdinal = (num) => {
	var s = ['th', 'st', 'nd', 'rd'];
	var v = num % 100;
	return `${num}<sup>${s[(v - 20) % 10] || s[v] || s[0]}</sup>`;
};

export const formatTimestamp = (isoStr) => {
	const date = new Date(isoStr);
	const opts = { month: 'short', day: 'numeric' };
	let dateNumeric = date.toLocaleDateString('en-US', opts);
	let dateNumericStrs = dateNumeric.split(' ');
	let dateOrdinal = `${dateNumericStrs[0]} ${getOrdinal(dateNumericStrs[1])}`;

	return dateOrdinal;
};

export const formatTimestampLong = (isoStr) => {
	const date = new Date(isoStr);
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
	const date = new Date(isoStr); // Convert ISO string to Date object

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
	// console.log(detectUserDateFormat());
	const output =
		detectUserDateFormat() === 1 ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
	return output;
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
