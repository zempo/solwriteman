<script>
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	// your script goes here

	import { accordion } from '$lib/snippets/PgSnips.svelte';
</script>

<h1>Welcome to SvelteKit</h1>

<!-- <details>
	<summary>Artist Statement</summary>
	<div class="details_body">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iusto aut itaque officiis
			sapiente maiores at dicta natus pariatur, beatae suscipit, nam, quaerat provident maxime
			blanditiis non odit.
		</p>
	</div>
</details> -->

<!-- {@render accordion()} -->
<h2>Disclosure Component</h2>
<Disclosure>
	{#snippet accH()}
		What is a disclosure component?
	{/snippet}
	{#snippet accC()}
		<p>
			Park at the nearest available parking meter without paying the meter and call 999-999-9999 to
			report the problem. We will note and approve your alternate location and will investigate the
			cause of the shortage in your assigned facility.
		</p>
	{/snippet}
</Disclosure>
