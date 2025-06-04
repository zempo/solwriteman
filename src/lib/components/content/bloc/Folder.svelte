<script>
	import Folder from './Folder.svelte';

	let { name, items = [], depth = 0, path = '' } = $props();
	let isOpen = $state(depth < 1);

	const depthColors = {
		0: '#a797ff',
		1: '#f8bc8d',
		2: '#96f390',
		default: '#ababab'
	};
</script>

{#snippet folderHeader(name, isOpen, toggle)}
	<button
		class="folder_header"
		onclick={toggle}
		style:--depth={depth}
		style:--isOpen={isOpen ? 1 : 0}
		style:background-color={depthColors[depth] ?? depthColors.default}
	>
		<span class="icon">{isOpen ? '📂' : '📁'}</span>
		<span class="name">{name}</span>
	</button>
{/snippet}

{#snippet fileItem(name, path, depth)}
	<a href={`${path}/${name}`} class="file" style={`--depth: ${depth}`}>
		<span class="icon">📄</span>
		<span class="name">{name}</span>
	</a>
{/snippet}

<div class="folder" style={`--depth: ${depth}`}>
	{@render folderHeader(name, isOpen, (e) => {
		e.stopPropagation();
		isOpen = !isOpen;
	})}

	{#if isOpen}
		<div class="folder_wrap">
			{#if items.length === 0}
				<p class="empty">This folder is empty.</p>
			{/if}
			{#each items as item}
				{#if item.type === 'folder'}
					<Folder
						name={item.name}
						items={item.items}
						depth={depth + 1}
						path={`${path}/${item.name}`}
					/>
				{:else}
					<div class="file_wrap">
						{@render fileItem(item.name, path, depth + 1)}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	// Define your color palette
	$depth-colors: #a797ff, #f8bc8d, #96f390, #ababab;

	.folder,
	.file {
		margin-left: calc(var(--depth) * 1rem);
	}

	.folder_header {
		border: 1px solid #2d2c3d89;
		padding: 0.25rem 0.5rem;
		margin: 0.15rem 0;
		border-radius: 0.25rem;
		box-shadow: var(--shadow4);
	}
</style>
