class Dimension {
	topbarH = $state(60);

	scrollTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}

export const dimension = new Dimension();
