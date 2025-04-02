import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki';
import { parse } from 'node-html-parser';

const THEMES = {
	light: 'houston',
	dark: 'houston'
};

// Cache the highlighter instance as a singleton
let highlighterInstance = null;

/**
 * Initialize and cache the highlighter instance
 */
async function getHighlighter() {
	if (!highlighterInstance) {
		highlighterInstance = await createHighlighter({
			themes: Object.keys(bundledThemes),
			langs: Object.keys(bundledLanguages)
		});
	}
	return highlighterInstance;
}

function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
	);
}

function makeFocussable(html) {
	const root = parse(html);
	root.querySelector('pre').setAttribute('tabIndex', '0');
	return root.toString();
}

function rangeParser(rangeString) {
	const result = [];
	const ranges = rangeString.split(',');
	ranges.forEach((element) => {
		if (element.indexOf('-') === -1) {
			result.push(parseInt(element, 10));
		} else {
			const limits = element.split('-');
			const start = parseInt(limits[0], 10);
			const end = parseInt(limits[1], 10);
			for (let i = start; i <= end; i += 1) {
				result.push(i);
			}
		}
	});
	return result;
}

/**
 * Main highlighter function
 */
async function highlighter(code, lang, meta) {
	const shikiHighlighter = await getHighlighter();
	let html;

	if (!meta) {
		html = shikiHighlighter.codeToHtml(code, {
			lang,
			themes: THEMES,
			defaultColor: false
		});
	} else {
		html = shikiHighlighter.codeToHtml(code, {
			lang,
			themes: THEMES,
			defaultColor: false
		});
	}

	html = makeFocussable(html);
	return escapeHtml(html);
}

export default highlighter;
