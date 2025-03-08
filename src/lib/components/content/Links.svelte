<script>
	let { contactLink } = $props();
</script>

{#if contactLink}
	<a href="/socials" class="contact_link">{@render contactLink()}</a>
{/if}
