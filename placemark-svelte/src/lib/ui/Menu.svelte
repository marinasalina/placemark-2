<script lang="ts">
	import { onMount } from 'svelte';
	import { loggedInUser } from '$lib/services/runes.svelte';

	onMount(() => {
		loggedInUser.name = localStorage.getItem('name') || '';
		loggedInUser.token = localStorage.getItem('token') || '';
		loggedInUser._id = localStorage.getItem('_id') || '';
		loggedInUser.email = localStorage.getItem('email') || '';
	});
</script>

<nav class="navbar is-link">
	<div class="navbar-menu is-active">
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
