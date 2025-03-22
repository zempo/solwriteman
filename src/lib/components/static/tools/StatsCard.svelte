<script>
	import { blogLaunchDate } from '$lib/config.js';
	import { getTimeDiff } from '../utils/date.js';
	import { onMount } from 'svelte';

	export let type = 'default';
	export let target = blogLaunchDate;

	let timeData = getTimeDiff(target, 'str');

	function updateTime() {
		timeData = getTimeDiff(target, 'str');
	}

	onMount(() => {
		const interval = setInterval(updateTime, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if type === 'bio'}
	<span class="stat_wrap">
		<b
			>{timeData.years} years,{timeData.days === 0
				? ''
				: ` ${timeData.days} days,`}{timeData.hours === 0 ? '' : ` ${timeData.hours} hours,`}
			{timeData.hours === 0 ? '' : ` ${timeData.minutes} mins,`} and
			{timeData.seconds} secs!</b
		>
	</span>
{/if}

<style lang="scss">
	.stat_wrap {
		display: block;
	}
</style>
