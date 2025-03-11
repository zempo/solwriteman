class Dimension {
	topbarH = $state(60);
	currScrollLanding = $state(0);

	scrollTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	skipToFeatured(targetId) {
		const targetArticle = document.getElementById(targetId);
		console.log(targetArticle);
		// window.scrollTo({
		// 	top: 0,
		// 	behavior: 'smooth'
		// });
	}
}

export const dimension = new Dimension();
