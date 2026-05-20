//Authentication helper. Handles: creating user securely, hashing passwords, login authentication,
//JWT token creation, reading user ID from token, resolving logged-in user identity
import bcrypt from 'bcrypt'; //used for hashing passwords securely
import jwt from 'jsonwebtoken'; //used to create authentication tokens
//Token proves user is logged in
import { User } from './models/user';

const JWT_SECRET = 'secret'; //Used to sign JW|T tokens

export async function createUser(userData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) {
	//hash password with bcrypt before storing it in the database. This ensures that even if the database is compromised, the actual passwords remain protected.
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	//Create new user acoount
	const user = new User({
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email.trim().toLowerCase(),
		password: hashedPassword
	});

	await user.save();

	return user;
}
//Handles login
export async function authenticateUser(email: string, password: string) {
	//find user
	const user = await User.findOne({
		email: email.trim().toLowerCase()
	});

	if (!user) return null;
	//check password with bcrypt. This compares the provided password with the hashed password stored in the database, ensuring that the authentication process is secure and resistant to common attacks like brute force or rainbow table attacks.
	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) return null;
	//create token with JWT. This token contains the user's ID and is signed with a secret key, allowing the server to verify the user's identity on subsequent requests without needing to query the database for every request, thus improving performance and scalability.
	const token = jwt.sign(
		{
			id: user._id
		},
		JWT_SECRET
	);
	//return session, used to keep user logged in
	return {
		name: `${user.firstName} ${user.lastName}`,
		_id: user._id.toString(),
		token
	};
}
// Extracts the user ID from the provided JWT token. This function verifies the token using the secret key and retrieves the user ID from the token's payload, allowing the application to identify the logged-in user based on their authentication token.
export function getUserIdFromToken(token: string | undefined): string | null {
	if (!token) return null;

	try {
		const payload = jwt.verify(token, JWT_SECRET) as { id: string };
		return payload.id?.toString() ?? null;
	} catch {
		return null;
	}
}
//Handleds mixed auth systems
export function resolveUserId(
	token: string | undefined,
	authSession: { user?: { email?: string | null } } | null
): string {
	return getUserIdFromToken(token) || authSession?.user?.email || '';
}
//create JWT directly
export function createToken(id: string) {
	return jwt.sign({ id }, JWT_SECRET);
}
