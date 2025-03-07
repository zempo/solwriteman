<script>
	import { main } from '$lib/store/main.svelte';
	import { onDestroy, tick } from 'svelte';
	// import { fade } from 'svelte/transition';

	// export let close = () => {};

	let dialog;
	let backdrop;

	// Close modal when clicking backdrop
	function handleBackdropClick(event) {
		console.log(event.target, backdrop);
		if (event.target === backdrop) {
			main.setModalOpen(0);
		}
	}

	// Close modal when clicking a link inside
	function handleLinkClick(event) {
		// if (event.target.tagName === 'A') {
		// 	main.setModalOpen(0);
		// }
	}

	// Manage focus when modal opens
	async function trapFocus() {
		await tick();
		if (main.modalOpen) {
			// modal?.querySelector('[tabindex]').focus();
			console.log(dialog);
			dialog.focus();
		}
	}

	$: if (main.modalOpen) trapFocus();
</script>

{#if main.modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" bind:this={backdrop} onclick={(e) => handleBackdropClick(e)}>
		<div
			class="modal"
			bind:this={dialog}
			role="dialog"
			aria-labelledby="modal-title"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- TODO mynaui:minimize animated svgs -->
			<button
				class="close-btn"
				type="button"
				onclick={() => main.setModalOpen(0)}
				aria-label="Close modal">✖</button
			>
			<slot></slot>
		</div>
	</div>
{/if}
