<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgHero from '$lib/components/layout/PgHero.svelte';
	import PgWrap from '$lib/components/layout/PgWrap.svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.contact} />
<PgWrap>
	<PgHero />
	<div class="contact_panels">
		<Disclosure isOpen={true}>
			{#snippet accH()}<span id="meet">Get in touch</span>{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}<span id="uses">Tools & Uses</span>{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}<span id="faq">FAQs</span>{/snippet}
			{#snippet accC()}
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, eum. Illo,
					dignissimos.
				</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
			{/snippet}
		</Disclosure>
	</div>
</PgWrap>
