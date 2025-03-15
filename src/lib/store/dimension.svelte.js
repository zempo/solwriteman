/* eslint-disable no-undef */
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
			this.featElDist = Math.floor(rect.top - scrollY);
		}
	}

	skipToFeatured() {
		if (this.featEl) {
			const rect = this.featEl.getBoundingClientRect();
			this.featElDist = Math.floor(rect.top - scrollY);
			this.featEl.setAttribute('tabindex', '-1');
			this.featEl.focus();
			this.featEl.scrollIntoView({ behavior: 'smooth' });
		}
	}
}

export const dimension = new Dimension();
