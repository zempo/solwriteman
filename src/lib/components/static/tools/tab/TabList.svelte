<script>
	const { children } = $props();
</script>

<div class="tab_list" role="tablist" aria-label="Content Tabs">
	{@render children()}
</div>
