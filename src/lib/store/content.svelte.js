/* eslint-disable no-undef */
class Content {
	byteTopic = $state('');
	byteMatchList = $state([]);

	queryByteTopic(url) {
		this.byteTopic = url.searchParams.get('topic');
	}
	toggleByteTopic(topic) {
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
		for (let idx = 0; idx < searchStrs.length; idx++) {
			let currPost = searchStrs[idx];
			let matchCond = currPost.content.includes(currQuery);
			if (matchCond) {
				matches.push(currPost.slug);
			}
		}

		if (type === 'byte') {
			this.byteMatchList = matches;
		} else {
			//
		}

		console.log(query, searchStrs);
	};

	handleClear = (type = 'byte') => {
		if (type === 'byte') {
			this.byteMatchList = [];
		} else {
			//
		}
	};
}

export const content = new Content();
