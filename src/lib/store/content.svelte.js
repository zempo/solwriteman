// import { page } from '$app/state';

/* eslint-disable no-undef */
class Content {
	byteTopic = $state(null);

	queryByteTopic(url) {
		this.byteTopic = url.searchParams.get('topic');
	}
}

export const content = new Content();
