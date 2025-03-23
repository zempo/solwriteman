// truncate('This is a long message', 20, '...'); --> 'This is a long...
export const truncate = (str, max, suffix) => {
	if (str.length > max) {
		return str.slice(0, max) + suffix;
	}
	return str;
};

export const getOrdinal = (num) => {
	var s = ['th', 'st', 'nd', 'rd'];
	var v = num % 100;
	return `${num}<sup>${s[(v - 20) % 10] || s[v] || s[0]}</sup>`;
};

export const nextIdx = (idx, len) => {
	let l = len;
	if (idx === l - 1) {
		return 0;
	}
	return idx + 1;
};
