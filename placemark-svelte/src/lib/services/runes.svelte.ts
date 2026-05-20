//Global shared state
export const subTitle = $state({ text: '' });
//Global logged-in user info, used across the app to determine if user is logged in and to display user info in the UI. It is updated upon login and cleared upon logout.
export const loggedInUser = $state({
	email: '',
	name: '',
	token: '',
	_id: ''
});
