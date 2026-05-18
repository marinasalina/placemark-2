<script lang="ts">
	import { resolve } from '$app/paths';
	import Message from '$lib/ui/Message.svelte';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';

	let { form } = $props();

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
</script>

<div class="box">
	{#if form?.message}
		<Message message={form.message} />
	{/if}

	<form method="POST" action="?/signup">
		<UserDetails bind:firstName bind:lastName />
		<UserCredentials bind:email bind:password />

		<input type="hidden" name="firstName" value={firstName} />
		<input type="hidden" name="lastName" value={lastName} />
		<input type="hidden" name="email" value={email} />
		<input type="hidden" name="password" value={password} />

		<button class="button">Sign Up</button>
	</form>

	<p class="has-text-centered">
		Already have an account?
		<a href={resolve('/login')}>Login Here</a>
	</p>
</div>
