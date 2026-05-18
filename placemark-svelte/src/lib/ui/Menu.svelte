<script lang="ts">
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
				<a class="navbar-item" href="/logout">Logout [{data.session.user?.name}]</a>
			{:else}
				<a class="navbar-item" href="/signup">Signup</a>
				<a class="navbar-item" href="/login">Login</a>
			{/if}
		</div>
	</div>
</nav>
