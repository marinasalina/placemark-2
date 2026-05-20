import { json } from '@sveltejs/kit';
//mkdir creates folder, write files - saves file
import { mkdir, writeFile } from 'fs/promises'; //Node.js, provides functions to work with the file system, such as creating directories and writing files.
import path from 'path'; // build into Node.js, used for safely create file path
// Get uploaded files from the form data, save them to the server, and return their URLs
//Read all images selected by the user from the uploaded form
export async function POST({ request }) {
	//WHen user chooses files, browser sends them inside request and formData(reads that request) and extracts the files from it. formData.getAll('images') retrieves all files associated with the 'images' field in the form and casts them to an array of File objects.
	const formData = await request.formData(); //gets data sent from HTML form
	//get all uplouded files from field called images, and casts them to an array of File objects. This allows us to work with the uploaded files in the server-side code.
	const files = formData.getAll('images') as File[];

	const uploadDir = path.join(process.cwd(), 'static', 'uploads');
	//Ensure the upload directory exists, creating it if necessary
	await mkdir(uploadDir, { recursive: true });

	//Save each uploaded file to the server and collect their URLs
	const images: string[] = [];

	for (const file of files) {
		//convert uploaded pictures into binary data so server can save it
		const buffer = Buffer.from(await file.arrayBuffer());
		const filename = `${Date.now()}-${file.name}`;
		//Takes the uploaded file data and saves physically to the server
		await writeFile(path.join(uploadDir, filename), buffer);
		//Stores images URLs
		//Later be used to display the image in the web application
		images.push(`/uploads/${filename}`);
	}
	//Sends the image paths back to the fronted so the galery can show them
	return json({ images });
}
