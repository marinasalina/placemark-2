<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';

	let { data } = $props();

	$effect(() => {
		if (data.session) {
			goto('/PlaceMark');
		}
	});
</script>

<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="column is-4 is-offset-4">
				<h3 class="title has-text-black has-text-centered">Login to PlaceMark</h3>

				<LoginForm />

				<div class="has-text-centered mt-5">
					<p class="mb-3">Or sign in with</p>

					<button class="button is-danger is-fullwidth mb-3" on:click={() => signIn('google')}>
						Login with Google
					</button>

					<button class="button is-dark is-fullwidth" on:click={() => signIn('github')}>
						Login with GitHub
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
