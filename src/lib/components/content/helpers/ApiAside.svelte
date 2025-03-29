<script>
	const { children, type = 'byte' } = $props();
</script>

<aside class="content_aside {type}_aside">
	<div class="page_specific">
		{@render children()}
	</div>
	<div class="global_aside">
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore voluptatum maiores a esse
			molestias.
		</p>
		<hr />
		<p>about me...</p>
		<p>Lorem, ipsum dolor.</p>
		<p>Lorem, ipsum dolor.</p>
	</div>
</aside>
