import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './models/user';

const JWT_SECRET = 'secret';

export async function createUser(userData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) {
	const hashedPassword = await bcrypt.hash(userData.password, 10);

	const user = new User({
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email.trim().toLowerCase(),
		password: hashedPassword
	});

	await user.save();

	return user;
}

export async function authenticateUser(email: string, password: string) {
	const user = await User.findOne({
		email: email.trim().toLowerCase()
	});

	if (!user) return null;

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) return null;

	const token = jwt.sign(
		{
			id: user._id
		},
		JWT_SECRET
	);

	return {
		name: `${user.firstName} ${user.lastName}`,
		_id: user._id.toString(),
		token
	};
}

export function getUserIdFromToken(token: string | undefined): string | null {
	if (!token) return null;

	try {
		const payload = jwt.verify(token, JWT_SECRET) as { id: string };
		return payload.id?.toString() ?? null;
	} catch {
		return null;
	}
}

export function resolveUserId(
	token: string | undefined,
	authSession: { user?: { email?: string | null } } | null
): string {
	return getUserIdFromToken(token) || authSession?.user?.email || '';
}
