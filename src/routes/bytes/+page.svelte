<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.bytes} />
<PgMain>
	<h1>Bytes</h1>
</PgMain>
