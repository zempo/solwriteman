<script>
	import { main } from '$lib/store/main.svelte';
	import { onDestroy, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { miniHov, miniReg } from '../svg/nav';
	import { navData } from '$lib/config';
	import { trapFocus } from '$lib/store/actions.svelte';

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
</script>

{#if main.modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="modal-backdrop"
		bind:this={backdrop}
		title="Minimize"
		onclick={(e) => handleBackdropClick(e)}
		use:trapFocus
	>
		<div
			class="modal"
			bind:this={dialog}
			role="dialog"
			aria-labelledby="modal-title"
			aria-modal="true"
			transition:fly={{ y: 200, duration: 300 }}
			onclick={(e) => e.stopPropagation()}
		>
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
			<nav class="main_nav modal_nav" aria-label="Site Menu">
				<ul class="nav_list_main nav_list">
					{#each navData.pages as P}
						<li class={`nav_link ${main.isActiveLink(P.href)}`}>
							{#if P.external}
								<a href={P.href} target="_blank" rel="noopener noreferrer">{P.title}</a>
							{:else}
								<a href={P.href}>{P.title}</a>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}
