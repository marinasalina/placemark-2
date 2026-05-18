export const load = async ({ cookies }) => {
	cookies.delete('token', { path: '/' });
	cookies.delete('name', { path: '/' });
	cookies.delete('email', { path: '/' });

	return {};
};
