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
		const cleanEmail = email.trim().toLowerCase();

		if (!cleanEmail || !password) {
			message = 'Please enter email and password';
			return;
		}

		console.log(`attempting login: ${cleanEmail}`);

		const session = await placemarkService.login(cleanEmail, password);

		if (session) {
			loggedInUser.email = cleanEmail;
			loggedInUser.name = session.name;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;

			localStorage.setItem('name', session.name);
			localStorage.setItem('token', session.token);
			localStorage.setItem('_id', session._id);
			localStorage.setItem('email', cleanEmail);

			goto('/PlaceMark');
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
