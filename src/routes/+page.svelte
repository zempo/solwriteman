<script>
	import HeroScene from '$lib/components/content/shaders/HeroScene.svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { dimension } from '$lib/store/dimension.svelte';
	import { main } from '$lib/store/main.svelte';
	import { seoData } from '$lib/config';
	// import { onMount } from 'svelte';
	// your script goes here
	let tH = $state();
</script>

<PgHead pgData={seoData.main} />
<PgMain>
	<header class="home_header">
		<h1>Solomon Zelenko</h1>
		<p class="sub_title" aria-hidden="true">On Paper • On Mic • Online</p>
		<span class="aria_text">On microphone, on paper, online</span>
		<HeroScene />
	</header>
	<article class="bio_section">
		<p>
			{dimension.topbarH}
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur blanditiis laboriosam,
			incidunt vero dignissimos sint impedit expedita harum. Nisi voluptas illum ipsam excepturi!
		</p>
	</article>

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
	<section>
		<h2>Disclosure Component</h2>
		<Disclosure isOpen="true">
			{#snippet accH()}
				What is a disclosure component? (open)
			{/snippet}
			{#snippet accC()}
				<p>
					Park at the nearest available parking meter without paying the meter and call 999-999-9999
					to report the problem. We will note and approve your alternate location and will
					investigate the cause of the shortage in your assigned facility.
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
	</section>
</PgMain>
