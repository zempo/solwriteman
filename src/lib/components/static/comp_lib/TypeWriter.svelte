<script>
	import { onMount, onDestroy } from 'svelte';

	export let messages = [];
	export let minSpeed = 30;
	export let maxSpeed = 150;
	export let eraseSpeed = 50;
	export let delay = 500;
	export let pauseBetween = 1000;

	let displayedText = '';
	let isTyping = false;
	let isErasing = false;
	let currentIndex = 0;
	let timeoutId; // Changed from animationId
	let isMounted = true;
	let currentSpeed = minSpeed;

	onDestroy(() => {
		isMounted = false;
		console.log('Unmounting TypeWriter');
		clearTimeout(timeoutId); // Fixed: Using clearTimeout instead
	});

	function shuffleMessages() {
		messages = [...messages].sort(() => Math.random() - 0.5);
		currentIndex = 0;
	}

	function getRandomSpeed() {
		return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
	}

	async function typeText(text) {
		if (!isMounted) return;

		currentSpeed = getRandomSpeed();
		isTyping = true;
		isErasing = false;

		for (let i = 0; i < text.length; i++) {
			if (!isMounted) return;
			displayedText = text.slice(0, i + 1);
			await new Promise((resolve) => (timeoutId = setTimeout(resolve, currentSpeed)));
		}

		isTyping = false;
		await new Promise((resolve) => (timeoutId = setTimeout(resolve, pauseBetween)));
		await eraseText();
	}

	async function eraseText() {
		if (!isMounted) return;

		isErasing = true;

		while (displayedText.length > 0) {
			if (!isMounted) return;
			displayedText = displayedText.slice(0, -1);
			await new Promise((resolve) => (timeoutId = setTimeout(resolve, eraseSpeed)));
		}

		isErasing = false;
		currentIndex = (currentIndex + 1) % messages.length;
		if (currentIndex === 0) shuffleMessages();
		await typeText(messages[currentIndex]);
	}

	onMount(async () => {
		if (messages.length === 0) return;

		shuffleMessages();
		await new Promise((resolve) => (timeoutId = setTimeout(resolve, delay)));
		await typeText(messages[currentIndex]);
	});
</script>

<div class="typewriter">
	<p>
		{displayedText}
		<span class:blinking={isTyping || isErasing}>|</span>
	</p>
</div>

<style>
	.typewriter {
		font-family: monospace;
		white-space: pre;
		display: inline-block;
		min-height: 1.2em;
	}

	.blinking {
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		from,
		to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
