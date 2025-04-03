<script>
	import { blogLaunchDate } from '$lib/config.js';
	import { formatTimeUnits, getTimeDiff } from '../utils/date.js';
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
			>{formatTimeUnits(
				[timeData.years, timeData.days, timeData.hours, timeData.minutes, timeData.seconds],
				['year', 'day', 'hour', 'min', 'sec'],
				', '
			)}!</b
		>
	</span>
{/if}
{#if type === 'byte'}
	<p class="stat_wrap">
		<b>
			{formatTimeUnits(
				[timeData.years, timeData.days, timeData.hours, timeData.minutes, timeData.seconds],
				['year', 'day', 'hour', 'min', 'sec'],
				', '
			)}!
		</b>
	</p>
{/if}

<style lang="scss">
	.stat_wrap {
		display: block;
	}
</style>
