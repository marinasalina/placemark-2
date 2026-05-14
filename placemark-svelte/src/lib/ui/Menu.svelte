<script lang="ts">
	//Import the run, this bring the global state object loggedInUser into component
	import { loggedInUser } from '$lib/services/runes.svelte';
</script>

<nav class="navbar is-full-width">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="/PlaceMark">
				<span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1">
					<i class="far fa-money-bill-alt"></i></span
				><span><strong>PlaceMark</strong> </span>
			</a>
		</div>
		<div id="navbarMenu" class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/PlaceMark"> PlaceMark </a>
				<a class="navbar-item" href="/Report"> Report </a>
				<a class="navbar-item" href="/charts">Charts</a>
				<!-- Display the user email directly from the rune-->
				<a class="navbar-item" href="/logout"> Logout [{loggedInUser.name}]</a>
			</div>
			<div></div>
		</div>
	</div>
</nav>
