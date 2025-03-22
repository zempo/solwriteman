<script>
	import { dimension } from '$lib/store/dimension.svelte';
	import { seoData, tabLabels } from '$lib/config';
	import { main } from '$lib/store/main.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import HeroScene from '$lib/components/content/shaders/HeroScene.svelte';
	import AudPlayer from '$lib/components/static/tools/aud/AudPlayer.svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';
	import Links from '$lib/components/content/Links.svelte';
	import StatsCard from '$lib/components/static/tools/StatsCard.svelte';
	import SkipBtn from '$lib/components/static/tools/SkipBtn.svelte';
	import { reelData } from '$lib/store/data/audioData.js';
	import AdaAlt from '$lib/components/static/comp_lib/AdaAlt.svelte';
	import OnScroll from '$lib/components/static/comp_lib/OnScroll.svelte';
</script>

<svelte:window bind:scrollY={dimension.currScrollLanding} />

<PgHead pgData={seoData.main} />
<PgMain>
	<header class="home_header" style="margin-top: {dimension.topbarH}px;">
		<h1>Solomon Zelenko</h1>
		<p class="sub_title">
			<AdaAlt textReg="On Paper • On Mic • Online" textAda="On paper, on mic, online" />
		</p>
		<HeroScene />
	</header>
	<SkipBtn />
	<article class="bio_section" aria-label="Biography Section">
		<figure
			class="t_fig hero_fig rbg_fig stmt_fig3"
			role="img"
			aria-label="A collection of digital artworks rendered in Blender: a microphone, stack of books and coffee mugs, and l shaped desk. Each item has a cardboard texture, except for a metallic laptop on the desk and select parts of the microphone."
		>
			<div class="img_wrap">
				<img src="https://i.imgur.com/1fsCNwX.png" class="c0" alt="" />
			</div>
			<div class="img_wrap">
				<img class="c0" src="https://i.imgur.com/lCRaMur.png" alt="" />
			</div>
			<div class="img_wrap">
				<img src="https://i.imgur.com/ZI6Qo8l.png" class="c0" alt="" />
			</div>
		</figure>
		<Tabs let:T>
			<T.List>
				{#each tabLabels.bio as L, i}
					<T.Tab id={i}><AdaAlt textReg={L} textAda={tabLabels.bio_ada[i]} /></T.Tab>
				{/each}
			</T.List>
			<T.Panel id={0}>
				<figure class="t_fig rbg_fig stmt_fig3">
					<div class="img_wrap">
						<img
							class="c1"
							src="https://i.imgur.com/Xa17s7r.png"
							alt="Artistic cardboard cat render, showcasing layered edges and a handcrafted aesthetic."
						/>
					</div>
					<div class="img_wrap">
						<img src="https://i.imgur.com/PCnIULR.png" class="c2" alt="" aria-hidden="true" />
					</div>
					<div class="img_wrap">
						<img src="https://i.imgur.com/wVRcNis.png" class="c3" alt="" aria-hidden="true" />
					</div>
					<figcaption class="aria_text">
						Rendered paper/cardboard cat created in Blender.
					</figcaption>
				</figure>
				<div class="t_text">
					<OnScroll>
						{#snippet fadeIn()}
							<p>
								Hi, I'm Solomon! 👋<br />
								And this is my artistic vision.<br />
								It is far superior to my 20/400 vision.
							</p>
							<p>
								Through <a
									href="https://solwriteman.substack.com"
									target="_blank"
									title="My blog!"
									rel="noopener noreferrer">Bytes && Snippets</a
								>, I share my slice of virtual wisdom. In bytes of procedural art, I express my
								humanity through geometry. And in poetic snippets, I integrate each of my bumbling
								spirits and memories into the greater narrative.
							</p>
							<p>
								I am a new father, Russian-Jewish American, and an ever curious learner. I commit to
								healthy masculinity and technological ethos — fulfilling an emerging responsibility
								as a men "who writes to heal". My narrative explores a nerdy niche and imagines
								pages beyond the weights on our shoulders.
							</p>
							<p>TL;DR, Let's connect and communicate — "On Mic, On Paper, and Online".</p>
						{/snippet}
					</OnScroll>
					<OnScroll>
						{#snippet flyUp()}
							<Links />
						{/snippet}
					</OnScroll>
				</div>
			</T.Panel>
			<T.Panel id={1}>
				<figure class="t_fig stmt_fig stmt_fig2">
					<div class="img_wrap">
						<img
							src="https://i.imgur.com/raiaRaE.jpeg"
							alt="Solomon's cat sleeping on a windowsill shelf, above an out-of-focus computer monitor."
						/>
					</div>
					<figcaption class="aria_text">
						Solomon's cat sleeping on a windowsill shelf, above an out-of-focus computer monitor.
					</figcaption>
				</figure>
				<div class="t_text">
					<p>
						I am a technologist and writer based in California, USA.<br />I love leveling up other
						devs and have been debugging my typos for: <StatsCard target="2016-11-13" type="bio" />
					</p>
					<p>
						From 2016-2018, I worked with the former non-profit,
						<a
							href="https://stemworks.wested.org/program/open-world-learning-owl/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Open World Learning (OWL)
						</a>. We taught applied math and logic through
						<a
							href="https://en.wikipedia.org/wiki/MicroWorlds"
							target="_blank"
							rel="noopener noreferrer">MicroWorlds EX</a
						>
						to Title I schools in Denver, Colorado. Inspired, I spent many tea-fueled evenings refining
						my dev skills. And in 2021, I landed my dream gig with
						<a href="https://www.aleks.com/" target="_blank" rel="noopener noreferrer"
							>McGraw Hill ALEKS</a
						>
						as a content programmer. On the side, I mentor, build
						<a
							href="https://threejs-journey.com/lessons/introduction"
							target="_blank"
							rel="noopener noreferrer">creative web apps</a
						>, and research
						<a href="https://thebookofshaders.com/" target="_blank" rel="noopener noreferrer"
							>pixel shaders</a
						> to craft performative, scaleable artworks. And I am excited to share best-practices and
						hard-earned lessons with you.
					</p>
					<p>
						In between these "Click-Clack Glow" times, you'll find me camping, cooking for loved
						ones, and debugging fatherhood with my wife, daughter Evelyn, and our Tortie Cat,
						Weasel.
					</p>
					<OnScroll>
						{#snippet flyUp()}
							<Links linkType="substack" text="@SolWriteMan (Substack)" />
						{/snippet}
					</OnScroll>
				</div>
			</T.Panel>
			<T.Panel id={2}>
				<figure class="t_fig rbg_fig stmt_fig3">
					<div class="img_wrap">
						<img
							class="c0"
							src="https://i.imgur.com/lCRaMur.png"
							alt="On Mic: Cardboard microphone render, showcasing layered edges and a handcrafted aesthetic — except for metallic knobs and bolts."
						/>
					</div>
					<div class="img_wrap">
						<img
							src="https://i.imgur.com/1fsCNwX.png"
							class="c0"
							alt="On Paper: fully cardboard book stack and mugs render, showcasing layered edges and a handcrafted aesthetic."
						/>
					</div>
					<div class="img_wrap">
						<img
							src="https://i.imgur.com/ZI6Qo8l.png"
							class="c0"
							alt="Online: Cardboard/paper stylized l-shaped computer desk setup render. Desk chair, computer monitor, and modem are also cardboard. Laptop is represented as a real laptop."
						/>
					</div>
					<figcaption class="aria_text">
						Rendered and stylized paper/cardboard microphone, book stack, and computer desk setup
						created in Blender.
					</figcaption>
				</figure>
				<div class="t_text">
					<p>
						For a more in-depth look at my art, stacks, and methods, check out the <a href="/tools"
							>tools page!</a
						>
					</p>
					<p>
						Outside my dev job, I offer one-on-one mentoring and freelance work. And my current
						toolkit is as follows:
					</p>
					<ul>
						<li>
							<p>
								<b>UI/UX:</b> Semantic HTML / CSS / SASS / Sveltekit / WordPress (CMS)
							</p>
						</li>
						<li>
							<p><b>Graphics & Visuals:</b> Three.js / D3.js / Blender / WebGL (Shaders)</p>
						</li>
						<li>
							<p><b>Misc:</b> Git / GitHub / SEO / FireBase / Supabase</p>
						</li>
					</ul>
					<p>
						I am also open to collaboration on written works. I offer my skills as a performer,
						narrator, and/or video editor.
					</p>
					<ul>
						<li>
							<p>
								<b>Writing & Editing:</b> Confluence (Drafting) / Libre Office or Reedsy (Layout and
								Manuscript)
							</p>
						</li>
						<li>
							<p><b>Visuals & Audio:</b> Kdenlive / Audacity / Inkscape</p>
						</li>
						<li>
							<p>
								<b>Performance:</b> Workshops / Post-Performance Retrospective (<a href="/tools"
									>More Info</a
								>).
							</p>
						</li>
					</ul>
					<OnScroll>
						{#snippet flyUp()}
							<Links text="Let's Collaborate!" />
						{/snippet}
					</OnScroll>
				</div>
			</T.Panel>
		</Tabs>
		<figure class="app_banner_l">
			<div class="img_wrap">
				<img
					src="https://i.imgur.com/erk5C9H.png"
					alt="Solomon reciting poetry at Libro Mobile arts cooperative and bookstore."
				/>
			</div>
			<OnScroll>
				{#snippet flyUp()}
					<figcaption>
						Reciting poetry at <a
							href="https://www.libromobile.com/"
							target="_blank"
							rel="noopener noreferrer">LibroMobile</a
						> arts cooperative and bookstore.
					</figcaption>
				{/snippet}
			</OnScroll>
		</figure>
	</article>
	<section class="featured_section" id="featured_content" bind:this={dimension.featEl}>
		<div class="section_head">
			<OnScroll>
				{#snippet flyUp()}
					<h2>Featured Content</h2>
					<p class="sub_title">Voice Over / Poems / New Art</p>
				{/snippet}
			</OnScroll>
		</div>
		<AudPlayer audData={reelData} />
	</section>
</PgMain>
