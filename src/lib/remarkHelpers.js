import { visit } from 'unist-util-visit';

export const lintCode = () => (tree) => {
	visit(tree, 'code', (node) => {
		let lines = node.value.split('\n');
		let newLines = [];

		lines.forEach((L) => {
			let trim = L.trim();
			let isComment = trim.startsWith('//') || trim.startsWith('#') || trim.startsWith('<!--');

			// Create a new code node for each line
			const newL = {
				type: 'element',
				tagName: 'span',
				properties: {
					className: isComment ? [`language-${node.lang} cmt`] : [`language-${node.lang} ln`]
				},
				children: [
					{
						type: 'text',
						value: L
					}
				]
			};
			// console.log(newL);
			newLines.push(newL);
		});

		let newCode = {
			type: 'element',
			tagName: 'code',
			properties: {
				className: [`language-${node.lang}`]
			},
			children: newLines
		};
		node = newCode;
	});
};
