<script>
	import { content } from '$lib/store/content.svelte.js';

	const { tags = [], slug = '', subtype = 'lab' } = $props();
</script>

<div class="byte_bio">
	<div class="byte_bio_img">
		<img
			src="https://i.imgur.com/9G4XYLU_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
			alt="Solomon leans, grinning, on the railing of a balcony overlooking Western Los Angeles. He's wearing a linen shirt and Panama-style hat."
		/>
	</div>
	<div class="byte_bio_text">
		<p>
			I'm Solomon Zelenko, a creative coder, visual artist, writer, and mentor.<span
				class="no_wrap"
			>
				I'm based in Southern California,</span
			>
			with my wife, kids, and our Tortie cat, Weasel.<br /> Please enjoy my Bytes & Snippets:
			<em>On Paper, On Mic, and Online</em>. <br />
		</p>
		<ul class="byte_bio_list">
			<li>
				<a href="https://ko-fi.com/solzelenko" target="_blank" rel="noopener noreferrer"
					>Buy Weasel a <em>Churu</em></a
				>
			</li>
			<li>
				<!-- * include slug in query params -->
				<a href="/contact#meet">Talk about this Byte, 1-on-1</a>
			</li>
			<li>
				<!-- * include slug in query params -->
				<a href="/">Country roads, take me <em>home</em></a>
			</li>
		</ul>
	</div>
	<div class="byte_bio_tags">
		<h2 class="use_h4">Posted In:</h2>
		<ul class="byte_bio_tags_list">
			{#each tags as T}
				<li class="tag_item {T === content.byteTopic ? 'btn_hl' : ''}">
					<button class="tag_btn" onclick={() => content.toggleByteTopicLink(T)}>
						#{T}
					</button>
				</li>
			{/each}
		</ul>
		<p class="scroll_top_p use_h4">
			<a href="/bytes/{subtype}/{slug}#pg_top" class="scroll_top_btn">👆Back to Top</a>
		</p>
	</div>
</div>
