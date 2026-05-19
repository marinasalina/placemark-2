<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/firebase';
	import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	let { form } = $props();

	async function googleLogin() {
		const result = await signInWithPopup(auth, new GoogleAuthProvider());

		await fetch('/firebase-login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				uid: result.user.uid,
				email: result.user.email
			})
		});

		goto(resolve('/PlaceMark'));
	}

	async function githubLogin() {
		try {
			const provider = new GithubAuthProvider();
			provider.addScope('user:email');

			const result = await signInWithPopup(auth, provider);

			await fetch('/firebase-login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					uid: result.user.uid,
					email: result.user.email ?? 'github-user'
				})
			});

			goto(resolve('/PlaceMark'));
		} catch (error: any) {
			if (error.code === 'auth/account-exists-with-different-credential') {
				alert(
					'This email already exists with Google. Sign in with Google first, then GitHub can be linked.'
				);
			} else {
				console.error(error);
				alert(String(error));
			}
		}
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
