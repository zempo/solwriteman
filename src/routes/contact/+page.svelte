<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.contact} />
<PgMain>
	<section class="app_section">
		<PgHero>{#snippet regHero()}{/snippet}</PgHero>
		<!--  -->
		<section class="app_subsec" id="uses">
			<h2>Uses</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias libero, non similique
				exercitationem, cum eaque a vero suscipit debitis quia doloribus vel id excepturi nulla?
				Dignissimos soluta beatae ducimus voluptatum rem maiores velit hic voluptates consequuntur
				doloremque, nostrum, ipsum quaerat voluptatibus id totam asperiores! Dignissimos labore
				culpa cupiditate amet qui aperiam ea quaerat doloribus repudiandae dolore!
			</p>
		</section>
		<section class="app_subsec" id="faq">
			<h2>FAQ</h2>
			<ul>
				<li>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis maiores
					voluptatibus, officiis dolorem provident hic recusandae optio sed accusantium, ipsa
					incidunt facilis quisquam.
				</li>
				<li>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus perferendis non hic
					culpa.
				</li>
			</ul>
		</section>
		<section class="app_subsec" id="contact">
			<h2>Contact Form</h2>
		</section>
	</section>
</PgMain>
