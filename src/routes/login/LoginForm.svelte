<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/services/runes.svelte';
	import { placemarkService } from '$lib/services/placemark-service';
	import Message from '$lib/ui/Message.svelte';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';

	let email = $state('');
	let password = $state('');
	let message = $state('');

	async function login() {
		console.log(`attempting login: ${email}`);
		let session = await placemarkService.login(email, password);

		if (session) {
			loggedInUser.email = email;
			loggedInUser.name = session.name;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
			goto('/placemarks');
		} else {
			message = 'Invalid Credentials';
			email = '';
			password = '';
		}
	}
</script>

<form on:submit|preventDefault={login}>
	<UserCredentials bind:email bind:password />
	<button class="button is-success is-fullwidth">Log In</button>
</form>
{#if message}
	<Message {message} />
{/if}
