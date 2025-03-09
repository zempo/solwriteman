<script>
	export let linkType = 'contact';
	export let text = `Get in Touch`;
</script>

{#if linkType == 'contact'}
	<a href="/socials" class="contact_link">{text}</a>
{/if}
