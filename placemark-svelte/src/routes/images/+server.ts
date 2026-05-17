import { json } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
	const formData = await request.formData();
	const files = formData.getAll('images') as File[];

	const uploadDir = path.join(process.cwd(), 'static', 'uploads');
	await mkdir(uploadDir, { recursive: true });

	const images: string[] = [];

	for (const file of files) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const filename = `${Date.now()}-${file.name}`;
		await writeFile(path.join(uploadDir, filename), buffer);

		images.push(`/uploads/${filename}`);
	}

	return json({ images });
}
