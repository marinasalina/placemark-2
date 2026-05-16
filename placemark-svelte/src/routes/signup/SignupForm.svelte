<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';
	import Message from '$lib/ui/Message.svelte';
	import { placemarkService } from '$lib/services/placemark-service';

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let message = $state('');

	async function signup() {
		const cleanEmail = email.trim().toLowerCase();

		if (!firstName.trim() || !lastName.trim() || !cleanEmail || !password) {
			message = 'Please fill in all fields';
			return;
		}

		console.log('SIGNUP EMAIL:', cleanEmail);
		console.log('SIGNUP PASSWORD:', password);

		const success = await placemarkService.signup({
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: cleanEmail,
			password: password
		});

		if (success) {
			goto(resolve('/login'));
		} else {
			message = 'Error trying to sign up';
		}
	}
</script>

<div class="box">
	{#if message}
		<Message {message} />
	{/if}

	<UserDetails bind:firstName bind:lastName />
	<UserCredentials bind:email bind:password />

	<button onclick={signup} class="button">Sign Up</button>

	<p class="has-text-centered">
		Already have an account?
		<a href={resolve('/login')}>Login Here</a>
	</p>
</div>
