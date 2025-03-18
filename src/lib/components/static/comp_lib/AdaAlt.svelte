<script>
	export let textReg = ''; // Text to display visually
	export let textAda = ''; // Text for screen readers
</script>

<span aria-label={textAda}>
	{textReg}
</span>
