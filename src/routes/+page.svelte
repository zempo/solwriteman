<script>
	import HeroScene from '$lib/components/content/shaders/HeroScene.svelte';
	import Disclosure from '$lib/components/content/Disclosure.svelte';
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { dimension } from '$lib/store/dimension.svelte';
	import { main } from '$lib/store/main.svelte';
	import { seoData, tabLabels } from '$lib/config';
	import Tabs from '$lib/components/static/tools/tab/Tabs.svelte';
	import Links from '$lib/components/content/Links.svelte';
	import StatsCard from '$lib/components/static/tools/StatsCard.svelte';
	import SkipBtn from '$lib/components/static/tools/SkipBtn.svelte';
</script>

<svelte:window bind:scrollY={dimension.currScrollLanding} />

<PgHead pgData={seoData.main} />
<PgMain>
	<header class="home_header" style="margin-top: {dimension.topbarH}px;">
		<h1>Solomon Zelenko</h1>
		<p class="sub_title" aria-hidden="true">On Paper • On Mic • Online</p>
		<span class="aria_text">On microphone, on paper, online</span>
		<HeroScene />
	</header>
	<SkipBtn />
	<article class="bio_section">
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
					<T.Tab id={i}>{L}</T.Tab>
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
					<p>
						In <a href="https://solwriteman.substack.com" target="_blank" rel="noopener noreferrer"
							>Bytes && Snippets</a
						>, I establish and join community — on mic, on paper, and online.
					</p>
					<p>
						In
						<a href="/bytes">procedural art bytes</a>, I convey my humanity through geometry — A
						<a
							href="https://folkdanceworld.com/2023/08/07/enchanting-russian-folk-dance-heritage.html#:~:text=and%20artistic%20expression.-,Hopak,-Russian%20Folk%20Dance"
							target="_blank"
							rel="noopener noreferrer">Hopak</a
						>
						between the Avant-Garde and Accessible. And in
						<a href="/snippets">poetic snippets</a>, I integrate silly geese and toe stubs into our
						larger narrative.
					</p>
					<p>
						I am a first-time father, a Russian-Jewish American, and an ever curious learner. And I
						commit to healthy masculinity and technological ethos — fulfilling our emerging
						responsibilities as "bros who code". This narrative explores a nerdy niche, touches on
						worlds outside our expectations, and celebrates becoming a neurodivergent man — on one's
						own terms.
					</p>
					<p>TL;DR, Let's connect, communicate, and transform our reality.</p>
					<Links />
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
						Hi, I'm Solomon! 👋<br />I am a technologist and writer based in California, USA.<br />I
						love leveling up other devs and have been debugging my typos for: <StatsCard
							target="2016-11-13"
							type="bio"
						/>
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
						to Title I schools in Denver, Colorado. Inspired by my time with OWL, I began to refine my
						dev skills, working with: Web Components, SASS, React, Svelte, ThreeJs, SQL, and other web
						technologies. In 2021, I landed my dream gig with
						<a href="https://www.aleks.com/" target="_blank" rel="noopener noreferrer"
							>McGraw Hill ALEKS</a
						>
						as a content programmer. On the side, I've been mentoring, building
						<a
							href="https://threejs-journey.com/lessons/introduction"
							target="_blank"
							rel="noopener noreferrer">creative web apps</a
						>, and researching
						<a href="https://thebookofshaders.com/" target="_blank" rel="noopener noreferrer"
							>pixel shaders</a
						> to craft performative, scaleable visuals. My work is equal parts art and science, and I
						am excited to share best-practices and hard-earned lessons to make your life easier.
					</p>
					<p>
						In between these "Click-Clack Glow" times, you'll find me camping, cooking for loved
						ones, and debugging fatherhood with my wife, daughter Evelyn, and our Tortie Cat,
						Weasel.
					</p>
					<Links linkType="substack" text="@SolWriteMan (Substack)" />
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
					<Links text="Let's Collaborate!" />
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
			<figcaption>
				Reciting poetry at <a
					href="https://www.libromobile.com/"
					target="_blank"
					rel="noopener noreferrer">LibroMobile</a
				> arts cooperative and bookstore.
			</figcaption>
		</figure>
	</article>

	<!-- <details>
		<summary>Artist Statement</summary>
		<div class="details_body">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iusto aut itaque officiis
				sapiente maiores at dicta natus pariatur, beatae suscipit, nam, quaerat provident maxime
				blanditiis non odit.
				</p>
				</div>
				</details> -->
	<!-- {main.theme} -->
	<!--  
					tabs snippet
					timestamp snippet
					calednar snippet
					figure/video/code-copy snippet 
					carousel
					modal snippet
					grid/table 
					tree view snippet?
					tooltip snippet
					breadcrumpb
					-->
	<section class="components_section" id="featured_content" bind:this={dimension.featEl}>
		<h2>Disclosure Component</h2>
		<Disclosure isOpen="true">
			{#snippet accH()}
				What is a disclosure component? (open)
			{/snippet}
			{#snippet accC()}
				<p>
					Park at the nearest available parking meter without paying the meter and call 999-999-9999
					to report the problem. We will note and approve your alternate location and will
					investigate the cause of the shortage in your assigned facility.
				</p>
			{/snippet}
		</Disclosure>
		<Disclosure>
			{#snippet accH()}
				Lorem is great (closed by default)
			{/snippet}
			{#snippet accC()}
				<p>Here's how you lorem</p>
				<figure>
					<img src="https://picsum.photos/200/300" alt="" />
					<figcaption>This allows you to ipsum</figcaption>
				</figure>
			{/snippet}
		</Disclosure>
		<div class="spacer">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
				consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
				aliquid.
			</p>
		</div>
		<div class="spacer">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
				consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
				aliquid.
			</p>
		</div>
		<div class="spacer">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
				consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
				aliquid.
			</p>
		</div>
		<div class="spacer">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eaque vero harum
				consequatur, nemo consequuntur aspernatur, qui dicta optio nesciunt dignissimos. Voluptates,
				aliquid.
			</p>
		</div>
	</section>
</PgMain>
