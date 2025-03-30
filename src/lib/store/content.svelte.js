/* eslint-disable no-undef */
class Content {
	byteTopic = $state('');

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
}

export const content = new Content();
