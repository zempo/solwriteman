import { browser } from '$app/environment';
import { navData } from '$lib/config';

/* eslint-disable no-undef */
class Main {
	modalOpen = $state(false);

	currentPage = $state('');

	themes = $state({
		dark: { name: 'dark', toolTip: 'Use Light Mode', icon: 'sun icon' },
		light: { name: 'light', toolTip: 'Use Dark Mode', icon: 'moon icon' }
	});
	selectedTheme = $state(this.themes.light);
	socialTheme = $derived(this.selectedTheme.name);

	dyslexicOn = $state(false);

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
		if (this.selectedTheme.name === 'light') {
			this.selectedTheme = this.themes['dark'];
		} else {
			this.selectedTheme = this.themes['light'];
		}
		const htmlEl = document.documentElement;
		htmlEl.dataset.theme = this.selectedTheme.name;
		localStorage.theme = this.selectedTheme.name;
	}

	setFont() {
		this.click();
		const htmlEl = document.documentElement;

		let enabled = this.dyslexicOn;
		if (browser) {
			localStorage.font ? (enabled = true) : (enabled = false);
		}
		enabled = !enabled;
		this.dyslexicOn = enabled;

		if (enabled) {
			localStorage.font = 'dyslexic';
			htmlEl.dataset.font = 'dyslexic';
		}
		if (!enabled) {
			localStorage.removeItem('font');
			delete htmlEl.dataset.font;
		}
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

	isActiveLink(URL) {
		if (this.currentPage === '/' && URL === '/') {
			return `nav_link_active main_link`;
		}

		return this.currentPage.includes(URL) && URL !== '/'
			? `nav_link_active ${this.currentPage.substring(1)}_link`
			: `nav_link_default`;
	}

	getKey() {
		return this.currentPage.substring(1);
	}
}

export const main = new Main();
