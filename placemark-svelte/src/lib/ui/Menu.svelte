<script lang="ts">
	import { loggedInUser } from '$lib/services/runes.svelte';
</script>

<nav class="navbar">
	<div class="navbar-menu">
		<div class="navbar-start">
			{#if loggedInUser.token}
				<a class="navbar-item" href="/PlaceMark">PlaceMark</a>
				<a class="navbar-item" href="/Report">Report</a>
				<a class="navbar-item" href="/charts">Charts</a>
				<a class="navbar-item" href="/map">Map</a>
			{/if}
		</div>

		<div class="navbar-end">
			{#if loggedInUser.token}
				<a class="navbar-item" href="/logout">Logout [{loggedInUser.name}]</a>
			{:else}
				<a class="navbar-item" href="/login">Login</a>
				<a class="navbar-item" href="/signup">Signup</a>
			{/if}
		</div>
	</div>
</nav>
