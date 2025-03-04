export const nextIdx = (idx, len) => {
	let l = len;
	if (idx === l - 1) {
		return 0;
	}
	return idx + 1;
};
