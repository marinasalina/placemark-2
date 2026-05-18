export const load = async (event) => {
	const authSession = await event.locals.auth();

	const token = event.cookies.get('token');
	const name = event.cookies.get('name');
	const email = event.cookies.get('email');

	return {
		url: event.url.pathname,
		session:
			authSession ||
			(token
				? {
						user: { name, email },
						token
					}
				: null)
	};
};
