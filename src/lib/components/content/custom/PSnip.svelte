<script>
	const {
		imgData = {
			link: 'https://picsum.photos/600',
			alt: 'Bytes',
			caption: 'Bytes are short, digestible pieces of content that are easy to consume and share.'
		}
	} = $props();
</script>

<figure class="psnip">
	<div class="img_wrap">
		<img src={imgData.link} alt={imgData.alt} />
	</div>
	<figcaption>{@html imgData.caption}</figcaption>
</figure>
