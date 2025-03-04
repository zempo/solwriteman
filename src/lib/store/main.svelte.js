import { browser } from '$app/environment';
import { navData } from '$lib/config';
import { label } from 'three/tsl';

class Main {
	modalOpen = $state(false);

	currentPage = $state('');

	themes = $state({
		dark: { name: 'dark', toolTip: 'Use Light Mode', icon: 'sun icon' },
		light: { name: 'light', toolTip: 'Use Dark Mode', icon: 'moon icon' }
	});
	selectedTheme = $state(this.themes.light);

	click() {
		const click = new Audio('/sounds/click.mp3');
		click.volume = 1;
		click.play();
	}

	setModalOpen(type) {
		this.click();
		if (type == 0) {
			this.modalOpen = false;
		} else if (type == 1) {
			this.modalOpen = true;
		} else {
			this.modalOpen = !this.modalOpen;
		}
	}

	getTheme() {
		if (!browser) return;

		const htmlEl = document.documentElement;
		const userTheme = localStorage.theme ?? 'light';

		if (userTheme) {
			htmlEl.dataset.theme = userTheme;
			return this.themes[userTheme];
		}

		// if nothing is set default to light mode
		// && !prefersDarkMode && !prefersLightMode
		if (!userTheme) {
			htmlEl.dataset.theme = 'light';
			localStorage.theme = 'light';
		}

		return this.themes[userTheme];
	}

	setTheme() {
		this.click();
		// let selectedTheme
		// console.log(this.selectedTheme.name, this.themes);
		if (this.selectedTheme.name === 'light') {
			this.selectedTheme = this.themes['dark'];
			// svgClr1.set('#b3b3b3');
			// svgClr2.set('#b3b3b3');
		} else {
			this.selectedTheme = this.themes['light'];
			// svgClr1.set('#222f39');
			// svgClr2.set('#222f39');
		}
		const htmlEl = document.documentElement;
		htmlEl.dataset.theme = this.selectedTheme.name;
		localStorage.theme = this.selectedTheme.name;
	}

	getNextPg(dir) {
		let links = navData.hrefs;
		let len = links.length - 1;
		let i_match = -1;
		let i_next = 0;

		if (this.currentPage === '/') {
			i_match = 0;
			i_next = dir === 0 ? 1 : len;
		} else {
			if (links.includes(this.currentPage)) {
				i_match = links.indexOf(this.currentPage);
				i_next = dir === 0 ? i_match + 1 : i_match - 1;
				if (i_match === len) {
					i_next = dir === 0 ? 0 : i_match - 1;
				}
			}
		}
		return links[i_next];
	}

	getLabel(dir) {
		let label;
		let target = this.getNextPg(dir);
		let targetStr = target.slice(1);
		targetStr = targetStr.charAt(0).toUpperCase() + targetStr.slice(1);
		label = targetStr;
		return label;
	}
}

export const main = new Main();
