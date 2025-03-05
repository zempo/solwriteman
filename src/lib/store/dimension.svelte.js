class Dimension {
	topbarH = $state();

	scrollTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}

export const dimension = new Dimension();
