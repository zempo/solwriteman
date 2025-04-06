<script>
	const { children, type = 'byte' } = $props();
</script>

<aside class="content_aside {type}_aside">
	<div class="page_specific">
		{@render children()}
	</div>
	<div class="global_aside">
		<h2 class="use_h4">Quick Links</h2>
		<ul>
			<li><a href="/bytes">All Bytes</a></li>
			<li><a href="/snippets">Snippets</a></li>
			<!-- also sroll to top of page -->
			<li><a href="/#about_me">About Me</a></li>
		</ul>
	</div>
</aside>
