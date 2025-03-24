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
