import { goto } from '$app/navigation';

/* eslint-disable no-undef */
class Content {
	byteTopic = $state('');
	byteMatchList = $state([]);
	byteTabStatus = $state(0); // 0: none, 1: lab, 2: kit, 3: both
	byteTopicObj = $state({});
	tabLab = $state(false);
	tabKit = $state(false);
	tabLabResult = $state(0);
	tabKitResult = $state(0);

	byteReset() {
		this.byteTopic = null;
		this.tabLab = false;
		this.tabKit = false;
		this.tabLabResult = 0;
		this.tabKitResult = 0;
	}

	queryByteTopic(url) {
		this.byteTopic = url.searchParams.get('topic');
	}
	toggleByteTopic(topic) {
		if (topic === this.byteTopic) {
			this.byteReset();
		} else {
			this.byteTopic = topic;
			this.tabLab = this.byteTopicObj[topic].lab > 0;
			this.tabKit = this.byteTopicObj[topic].kit > 0;
			this.tabLabResult = this.byteTopicObj[topic].lab;
			this.tabKitResult = this.byteTopicObj[topic].kit;
		}
	}
	toggleByteTopicLink(topic) {
		this.toggleByteTopic(topic);

		if (this.byteTopic === null) {
			goto('/bytes', {
				// replaceState: true,
				noScroll: true
			});
			return;
		}
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

		this.byteReset();

		for (let idx = 0; idx < searchStrs.length; idx++) {
			let currPost = searchStrs[idx];
			let matchCond = currPost.content.includes(currQuery);
			if (matchCond) {
				matches.push(currPost.slug);
				this.tabLabResult += currPost.subType === 'lab' ? 1 : 0;
				this.tabKitResult += currPost.subType === 'kit' ? 1 : 0;
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
			this.byteReset();
		} else {
			//
		}
	};
}

export const content = new Content();
