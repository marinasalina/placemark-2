<script lang="ts">
	import Message from '$lib/ui/Message.svelte';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';

	let { form } = $props();

	let email = $state('');
	let password = $state('');
</script>

<form method="POST">
	<UserCredentials bind:email bind:password />

	<input type="hidden" name="email" value={email} />
	<input type="hidden" name="password" value={password} />

	<button class="button is-success is-fullwidth">Log In</button>
</form>

{#if form?.message}
	<Message message={form.message} />
{/if}
