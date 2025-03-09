<script>
	export let linkType = 'contact';
	export let text = `Get in Touch!`;
</script>

{#if linkType == 'contact'}
	<a href="/socials" class="contact_link">{text}</a>
{/if}
{#if linkType == 'substack'}
	<a
		href="https://solwriteman.substack.com/"
		target="_blank"
		rel="noopener noreferrer"
		class="contact_link substack_link">{text}</a
	>
{/if}
