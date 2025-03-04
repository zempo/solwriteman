<script>
	import PgHead from '$lib/components/layout/PgHead.svelte';
	import PgMain from '$lib/components/layout/PgMain.svelte';
	import { seoData } from '$lib/config';
</script>

<PgHead pgData={seoData.books} />
<PgMain>
	<h1>Books</h1>
</PgMain>
