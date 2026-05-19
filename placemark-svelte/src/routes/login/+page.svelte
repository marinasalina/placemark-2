<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	let { data, form } = $props();

	async function googleLogin() {
		await signInWithPopup(auth, new GoogleAuthProvider());
		goto(resolve('/PlaceMark'));
	}

	async function githubLogin() {
		await signInWithPopup(auth, new GithubAuthProvider());
		goto(resolve('/PlaceMark'));
	}
</script>

<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="column is-4 is-offset-4">
				<h3 class="title has-text-black has-text-centered">Login to PlaceMark</h3>

				<LoginForm {form} />

				<div class="has-text-centered mt-5">
					<p class="mb-3">Or sign in with</p>

					<button class="button is-danger is-fullwidth mb-3" onclick={googleLogin}>
						Login with Google
					</button>

					<button class="button is-dark is-fullwidth" onclick={githubLogin}>
						Login with GitHub
					</button>
				</div>
			</div>
			<a class="button is-link is-light is-fullwidth mt-3" href={resolve('/signup')}>
				Back to Sign Up
			</a>
		</div>
	</div>
</section>
