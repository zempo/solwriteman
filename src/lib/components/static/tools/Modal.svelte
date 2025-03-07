<script>
	import { main } from '$lib/store/main.svelte';
	import { onDestroy, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { miniHov, miniReg } from '../svg/nav';

	let dialog;
	let backdrop;
	let isHov = false;
	let hovIn = () => {
		isHov = true;
	};
	let hovOut = () => {
		isHov = false;
	};

	// Close modal when clicking backdrop
	function handleBackdropClick(event) {
		if (event.target === backdrop) {
			main.setModalOpen(0);
		}
	}

	// Manage focus when modal opens
	async function trapFocus() {
		await tick();
		if (main.modalOpen) {
			dialog.focus();
		}
	}

	$: if (main.modalOpen) trapFocus();

	// Focus trap utility
	function focusTrap(node) {
		const previousActiveElement = document.activeElement;
		let focusableElements = [];

		// Get all focusable elements inside the modal
		function updateFocusableElements() {
			focusableElements = Array.from(
				node.querySelectorAll(
					'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
						'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
				)
			);
		}

		// Handle Tab key navigation
		function handleKeydown(event) {
			if (event.key !== 'Tab') return;

			updateFocusableElements();
			if (focusableElements.length === 0) return;

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey) {
				// Shift + Tab: Go to previous element
				if (document.activeElement === firstElement) {
					lastElement.focus();
					event.preventDefault();
				}
			} else {
				// Tab: Go to next element
				if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		}

		// Initialize focus trap
		updateFocusableElements();
		if (focusableElements.length > 0) focusableElements[0].focus();
		node.addEventListener('keydown', handleKeydown);

		// Cleanup when modal closes
		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
				previousActiveElement?.focus(); // Restore original focus
			}
		};
	}
</script>

{#if main.modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="modal-backdrop"
		bind:this={backdrop}
		onclick={(e) => handleBackdropClick(e)}
		use:focusTrap
	>
		<div
			class="modal"
			bind:this={dialog}
			role="dialog"
			aria-labelledby="modal-title"
			aria-modal="true"
			tabindex="-1"
			title="Minimize"
			transition:fly={{ y: 200, duration: 300 }}
			onclick={(e) => e.stopPropagation()}
		>
			<!-- TODO mynaui:minimize animated svgs -->
			<button
				class="close-btn"
				type="button"
				onclick={() => main.setModalOpen(0)}
				transition:fade={{ duration: 250, delay: 250 }}
				onmouseover={() => hovIn()}
				onfocus={() => hovIn()}
				onmouseout={() => hovOut()}
				onblur={() => hovOut()}
				aria-label="Close modal"
			>
				{#if isHov}
					{@html miniHov}
				{:else}
					{@html miniReg}
				{/if}
			</button>
			<slot></slot>
		</div>
	</div>
{/if}
