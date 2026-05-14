<script lang="ts">
	import { goto } from '$app/navigation';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';
	import Message from '$lib/ui/Message.svelte';
	import { resolve } from '$app/paths';

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let message = $state('');

	async function signup() {
		const success = false;
		if (success) {
			goto(resolve('/PlaceMark'));
		} else {
			message = 'Error Trying to sign up';
		}
	}
</script>

<div class="box">
	{#if message}
		<Message {message} />
	{/if}
	<UserDetails bind:firstName bind:lastName />
	<UserCredentials bind:email bind:password />
	<button onclick={() => signup()} class="button">Sign Up</button>
	<p class="has-text-centered">
		Already have an account? <a href={resolve('/login')} data-cy="login-redirect">Login Here</a>
	</p>
</div>
