<script>
	import { main } from '$lib/store/main.svelte';
	import { getRouteClass } from '../static/utils/nav';

	let { children, type = 'm' } = $props();
</script>

<div class={`app_wrap ${getRouteClass(main.currentPage)}_wrap app_wrap_${type}`}>
	{@render children()}
</div>
