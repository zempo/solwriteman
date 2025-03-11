class Dimension {
	topbarH = $state(60);
	currScrollLanding = $state(0);
	featElDist = $state(600);
	featEl = $state();

	scrollTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	calcFeatured() {
		if (this.featEl) {
			const rect = this.featEl.getBoundingClientRect();
			this.featElDist = Math.floor(rect.top - scrollY) - 100;
		}
	}

	skipToFeatured() {
		if (this.featEl) {
			const rect = this.featEl.getBoundingClientRect();
			this.featElDist = rect.top + window.scrollY;
			this.featEl.setAttribute('tabindex', '-1');
			this.featEl.focus();
			this.featEl.scrollIntoView({ behavior: 'smooth' });
		}
	}
}

export const dimension = new Dimension();
