<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	let { data } = $props();
</script>

<nav class="navbar is-link">
	<div class="navbar-menu is-active">
		<div class="navbar-start">
			{#if data.session}
				<a class="navbar-item" href="/PlaceMark">PlaceMark</a>
				<a class="navbar-item" href="/Report">Report</a>
				<a class="navbar-item" href="/charts">Charts</a>
				<a class="navbar-item" href="/map">Map</a>
			{/if}
		</div>

		<div class="navbar-end">
			{#if data.session}
				<button
					class="navbar-item button is-link"
					on:click={() => signOut({ callbackUrl: '/signup' })}
				>
					Logout [{data.session.user?.name || data.session.user?.email}]
				</button>
			{:else}
				<a class="navbar-item" href="/login">Login</a>
				<a class="navbar-item" href="/signup">Signup</a>
			{/if}
		</div>
	</div>
</nav>
