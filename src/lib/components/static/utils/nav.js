export const getRouteClass = (url) => {
	let routeMap = new Map();
	routeMap.set('main', 'main_on');
	routeMap.set('books', 'books_on');
	routeMap.set('bytes', 'bytes_on');
	routeMap.set('snippets', 'snippets_on');
	routeMap.set('contact', 'contact_on');

	let urlSplits = url.split('/');

	return routeMap.get(`${urlSplits[1]}`) ?? 'main_on';
};
