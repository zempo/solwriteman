<script>
	import { goto } from '$app/navigation';
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
			<li><a href="/snippets">All Snips</a></li>
			<!-- use goto method onclick with link -->
			<li><a href="/contact#meet">Get in Touch!</a></li>
		</ul>
	</div>
</aside>
