import { browser } from '$app/environment';

class Main {
	selectedTheme = $state('light');
	themes = $state({
		dark: { name: 'dark', toolTip: 'Use Light Mode', icon: 'sun icon' },
		light: { name: 'light', toolTip: 'Use Dark Mode', icon: 'moon icon' }
	});

	click() {
		const click = new Audio('/sounds/click.mp3');
		click.volume = 1;
		click.play();
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
		console.log(this.selectedTheme, this.themes);
	}
}

export const main = new Main();

export const themeState = $state({
	theme: 'light'
});
