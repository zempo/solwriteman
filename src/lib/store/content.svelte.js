import { goto } from '$app/navigation';

/* eslint-disable no-undef */
class Content {
	byteTopic = $state('');
	byteMatchList = $state([]);
	byteTabStatus = $state(0); // 0: none, 1: lab, 2: kit, 3: both
	byteTopicObj = $state({});
	tabLab = $state(false);
	tabKit = $state(false);

	queryByteTopic(url) {
		this.byteTopic = url.searchParams.get('topic');
	}
	toggleByteTopic(topic) {
		if (topic === this.byteTopic) {
			this.byteTopic = null;
			this.tabLab = false;
			this.tabKit = false;
		} else {
			this.byteTopic = topic;
			this.tabLab = this.byteTopicObj[topic].lab > 0;
			this.tabKit = this.byteTopicObj[topic].kit > 0;
		}
	}
	toggleByteTopicLink(topic) {
		this.toggleByteTopic(topic);
		goto(`/bytes?topic=${this.byteTopic}`);
	}
	setTopicObj(labs, kits) {
		let topicObj = {};
		labs.forEach((lab) => {
			lab.topics.forEach((topic) => {
				if (!topicObj[topic]) {
					topicObj[topic] = { lab: 1, kit: 0 };
				} else {
					topicObj[topic].lab += 1;
				}
			});
		});
		kits.forEach((kit) => {
			kit.topics.forEach((topic) => {
				if (!topicObj[topic]) {
					topicObj[topic] = { lab: 0, kit: 1 };
				} else {
					topicObj[topic].kit += 1;
				}
			});
		});
		// console.log(topicObj);
		this.byteTopicObj = topicObj;
		// return topicObj;
	}

	handleSearch = (e, query, searchStrs = [], type = 'byte') => {
		e.preventDefault();

		if (query === '') {
			this.handleClear(type);
			return;
		}

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
