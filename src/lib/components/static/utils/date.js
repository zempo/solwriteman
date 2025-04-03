/**
 * *For website stats in about secion and homepage
 */
export const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const countLeapYearDays = (startYear, endYear) => {
	let leapDays = 0;

	for (let yr = startYear; yr < endYear; yr++) {
		if (isLeapYear(yr)) {
			leapDays += 1;
		}
	}

	return leapDays;
};

/**
 * @params {number} x - Adding the leading zeros.
 */
export const digitFormat = (x) => (x < 10 ? `0${x}` : x);

/**
 * @params {string} targetStr - The target date string in 'YYYY-MM-DD' format.
 * @params {string} format - 'digit' returns a string with leading zeros, 'any other string' returns a string without leading zeros.
 * */
export const getTimeDiff = (targetStr = '2024-12-01', format = 'digit') => {
	let currDate = new Date();
	let targetDate = new Date(targetStr);

	let diffInMillis = Math.abs(targetDate - currDate);
	if (targetDate < currDate) {
		diffInMillis = Math.abs(currDate - targetDate);
	}

	//  totdal diff by unit
	const totalMin = Math.floor(diffInMillis / (1000 * 60));
	const totalHrs = Math.floor(diffInMillis / (1000 * 60 * 60));
	const totalDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
	const totalYears = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 365));

	// remainder by unit
	const days = Math.floor((diffInMillis % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diffInMillis % (1000 * 60)) / 1000);

	let hoursFormat = hours;
	let minutesFormat = minutes;
	let secondsFormat = seconds;
	if (format === 'digit') {
		hoursFormat = digitFormat(hours);
		minutesFormat = digitFormat(minutes);
		secondsFormat = digitFormat(seconds);
	}

	return {
		totalYears,
		totalDays,
		totalHrs,
		totalMin,
		years: totalYears,
		days,
		hours: hoursFormat,
		minutes: minutesFormat,
		seconds: secondsFormat
	};
};

/**
 * Formats an array of time units into a human-readable string
 * @param {number[]} times - Array of time values
 * @param {string[]} units - Array of unit names corresponding to the times
 * @param {string} [sep=', '] - Separator between units (default: ', ')
 * @returns {string} Formatted time string
 */
export const formatTimeUnits = (times, units, sep = ', ') => {
	// Filter out zero values and pair non-zero times with their units
	const nonZeroPairs = times
		.map((time, index) => ({ time, unit: units[index] }))
		.filter((pair) => pair.time !== 0);

	// Handle empty case
	if (nonZeroPairs.length === 0) return '';

	// Format each unit with proper pluralization
	const formattedParts = nonZeroPairs.map((pair, index) => {
		const isLast = index === nonZeroPairs.length - 1;
		const isSecondLast = index === nonZeroPairs.length - 2;

		let separator = sep;
		if (isSecondLast && nonZeroPairs.length > 1) {
			separator = ' and ';
		} else if (isLast) {
			separator = '';
		}

		return `${pair.time} ${pair.unit}${pair.time > 1 ? 's' : ''}${separator}`;
	});

	// Join all parts and replace any remaining "and ," with just "and"
	return formattedParts.join('').replace(/, and /g, ' and ');
};
