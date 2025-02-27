<script>
	import { main } from '$lib/store/main.svelte';
	import { getRouteClass } from '../static/utils/nav';

	let { children } = $props();
</script>

<main class={`app_main ${getRouteClass(main.currentPage)}_main`}>
	{@render children()}
</main>
