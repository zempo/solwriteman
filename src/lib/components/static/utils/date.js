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

export const digitFormat = (x) => (x < 10 ? `0${x}` : x);

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
