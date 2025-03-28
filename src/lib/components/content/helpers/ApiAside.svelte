<script>
	const { children, type = 'byte' } = $props();
</script>

<aside class="content_aside {type}_aside">
	<div class="page_specific">
		{@render children()}
	</div>
	<div class="global_aside">
		<p>about me...</p>
	</div>
</aside>
