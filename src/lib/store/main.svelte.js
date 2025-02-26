import { browser } from '$app/environment';

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
		console.log(this.selectedTheme.name, this.themes);
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
}

export const main = new Main();
