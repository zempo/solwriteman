/* eslint-disable no-undef */
class Dimension {
	topbarH = $state(60);
	hideTop = $state(false);
	currScrollLanding = $state(0);
	currW = $state(300);
	trunc1 = $derived(Math.ceil(this.currW / 24));
	featElDist = $state(600);
	featEl = $state();

	scrollTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	showTopbar() {
		let currScroll = 0;
		let cond1 = window.innerHeight + window.scrollY;
		let cond2 = document.body.offsetHeight - 1;
		if (cond1 >= cond2) {
			this.hideTop = false;
		} else if (currScroll) {
			this.hideTop = true;
		} else {
			this.hideTop = false;
		}
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
