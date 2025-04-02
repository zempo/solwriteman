/* eslint-disable no-undef */
class Content {
	byteTopic = $state('');
	byteMatchList = $state([]);
	byteTabStatus = $state(0); // 0: none, 1: lab, 2: kit, 3: both

	queryByteTopic(url) {
		this.byteTopic = url.searchParams.get('topic');
	}
	toggleByteTopic(topic, type = 'byte') {
		if (topic === this.byteTopic) {
			this.byteTopic = null;
		} else {
			this.byteTopic = topic;
		}
	}
	handleSearch = (e, query, searchStrs = [], type = 'byte') => {
		e.preventDefault();

		let currQuery = query.toLowerCase();
		let matches = [];
		let tmpStat = 0;
		for (let idx = 0; idx < searchStrs.length; idx++) {
			let currPost = searchStrs[idx];
			let matchCond = currPost.content.includes(currQuery);
			if (matchCond) {
				matches.push(currPost.slug);
				if (tmpStat === 0) {
					tmpStat = currPost.subType === 'lab' ? 1 : 2;
				} else if (
					(tmpStat === 1 && currPost.subType === 'kit') ||
					(tmpStat === 2 && currPost.subType === 'lab')
				) {
					tmpStat = 3;
				} else {
					// do nothing
				}
			}
		}
		this.byteTabStatus = tmpStat;

		if (type === 'byte') {
			this.byteMatchList = matches;
		} else {
			//
		}
	};

	handleClear = (type = 'byte') => {
		if (type === 'byte') {
			this.byteMatchList = [];
			this.byteTabStatus = 0;
		} else {
			//
		}
	};
}

export const content = new Content();
