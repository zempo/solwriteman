import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	plugins: [
		sveltekit(),
		glsl({
			transform: (code, id) => {
				// Check if this is a shader file (e.g., .frag or .vert)
				if (id.endsWith('.frag') || id.endsWith('.vert')) {
					return `#version 460\n${code}`;
				}
				return code;
			}
		})
	],
	server: {
		fs: {
			allow: ['.']
		}
	}
});
