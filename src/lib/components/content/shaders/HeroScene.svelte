<script>
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import vertexShader from './s1/vertHero.glsl';
	import fragmentShader from './s1/fragHero.glsl';
	import { micOff, micOn, next } from '$lib/components/static/svg/scene';
	import { nextIdx } from '$lib/components/static/utils/helpers';

	let canvas; // Reference to the canvas element
	let audioContext, analyser, dataArray, source;
	let isMicActive = false; // Tracks if the mic input is active
	let currShader = 0;
	let animationFrameId;

	async function toggleMicInput() {
		try {
			if (!isMicActive) {
				// Request user permission for microphone access
				// Check for user interaction
				if (!audioContext || audioContext.state === 'closed') {
					audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Use webkit prefix for iOS
				}

				// Resume the audio context in response to user interaction
				if (audioContext.state === 'suspended') {
					await audioContext.resume();
				}

				// Request microphone input
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

				// Set up audio processing
				analyser = audioContext.createAnalyser();
				analyser.fftSize = 256; // Adjust for resolution of frequency data
				dataArray = new Uint8Array(analyser.frequencyBinCount);
				source = audioContext.createMediaStreamSource(stream);
				source.connect(analyser);
				isMicActive = true; // Indicate mic input is active
			} else {
				isMicActive = false;
				if (audioContext) {
					audioContext.close();
				}
			}
		} catch (error) {
			console.error('Error accessing microphone:', err);
		}
	}

	function nextShader() {
		let nIdx = nextIdx(currShader, 6);
		currShader = nIdx;
	}
	{
		micOff;
	}

	onMount(() => {
		// Set up scene, camera, and renderer
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 1;

		const renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Create a plane geometry and apply shader material
		const geometry = new THREE.PlaneGeometry(2, 2);
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				u_time: { value: 0.0 },
				u_audio: { value: 0.0 },
				u_shader_idx: { value: currShader }
			}
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Animation loop
		function animate() {
			animationFrameId = requestAnimationFrame(animate);

			// Update audio uniform if analyser is available
			if (isMicActive && analyser) {
				analyser.getByteFrequencyData(dataArray);
				// Calculate average amplitude (or customize as needed)
				const avgAmplitude = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
				material.uniforms.u_audio.value = avgAmplitude / 255; // Normalize to 0-1
			}

			if (!isMicActive) {
				material.uniforms.u_audio.value = 0.0;
			}

			// Update uniform values
			material.uniforms.u_shader_idx.value = currShader;
			material.uniforms.u_time.value = performance.now() / 1000;
			renderer.render(scene, camera);
		}

		// Start animation
		animate();

		// Handle window resize
		window.addEventListener('resize', onWindowResize);
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
		}

		return () => {
			// Clean up
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', onWindowResize);

			renderer.dispose();
			geometry.dispose();
			material.dispose();

			if (audioContext) audioContext.close();
		};
	});
</script>

<canvas class="hero_scene" bind:this={canvas}></canvas>
<ul class="scene_btns" aria-label="Shader Slideshow controls">
	<!-- disabled={isMicActive} -->
	<li>
		<button
			class={`mic_btn ${isMicActive ? 'mic_btn_on' : ''}`}
			on:click={toggleMicInput}
			title={isMicActive ? 'Turn Mic Off' : 'Mic Interaction'}
			aria-hidden="true"
		>
			{#if isMicActive}
				{@html micOn}
			{:else}
				{@html micOff}
			{/if}
		</button>
	</li>
	<li>
		<button class="next_btn" on:click={nextShader} title="Load Next Visual">
			{@html next}
		</button>
	</li>
</ul>

<style lang="scss">
	@mixin transition($property: all, $duration: 0.3s, $timing: ease, $delay: 0s) {
		-webkit-transition: $property $duration $timing $delay;
		-moz-transition: $property $duration $timing $delay;
		-ms-transition: $property $duration $timing $delay;
		-o-transition: $property $duration $timing $delay;
		transition: $property $duration $timing $delay;
	}
	/* @import "lib/assets/scss/..." */
	.scene_btns {
		position: absolute;
		left: 0.25rem;
		bottom: 0.25rem;
		button {
			cursor: pointer;
			border-radius: 0.21rem;
			padding-inline: 1.25rem;
			// background-color: orange;
			background-color: #c8c8c86e;
			color: white;
			border-color: #c8c8c86e;
			box-shadow: var(--shadow3);
			@include transition(all, 0.15s, ease-in, 0s);
			&:hover {
				background-color: #6ea3afa1;
				border-color: #6ea3af;
				@include transition(all, 0.15s, ease-in, 0s);
			}
			&:active {
				position: relative;
				top: 0.1rem;
			}
			svg {
				.target_fill_lt {
					fill: white;
				}
			}
		}
		.mic_btn {
			position: relative;
			&.mic_btn_on {
				background-color: var(--accentMain);
				border-color: var(--accentMainLt);
			}
			// top: 1rem;
		}
	}
</style>
