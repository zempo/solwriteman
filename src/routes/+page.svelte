<script>
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { seoData } from '$lib/config';
	import { main } from '$lib/store/main.svelte';
	// import { onMount } from 'svelte';
	// your script goes here
</script>

<PgHead pgData={seoData.main} />
<PgMain>
	<h1>Solomon Zelenko</h1>

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
	<!-- {main.theme} -->
	<!--  
					tabs snippet
					timestamp snippet
					calednar snippet
					figure/video/code-copy snippet 
					carousel
					modal snippet
					grid/table 
					tree view snippet?
					tooltip snippet
					breadcrumpb
					-->

	<h2>Disclosure Component</h2>
	<Disclosure isOpen="true">
		{#snippet accH()}
			What is a disclosure component? (open)
		{/snippet}
		{#snippet accC()}
			<p>
				Park at the nearest available parking meter without paying the meter and call 999-999-9999
				to report the problem. We will note and approve your alternate location and will investigate
				the cause of the shortage in your assigned facility.
			</p>
		{/snippet}
	</Disclosure>
	<Disclosure>
		{#snippet accH()}
			Lorem is great (closed by default)
		{/snippet}
		{#snippet accC()}
			<p>Here's how you lorem</p>
			<figure>
				<img src="https://picsum.photos/200/300" alt="" />
				<figcaption>This allows you to ipsum</figcaption>
			</figure>
		{/snippet}
	</Disclosure>
	<div class="spacer">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
			consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
			aliquid.
		</p>
	</div>
	<div class="spacer">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
			consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
			aliquid.
		</p>
	</div>
	<div class="spacer">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
			consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
			aliquid.
		</p>
	</div>
	<div class="spacer">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
			consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
			aliquid.
		</p>
	</div>
</PgMain>
