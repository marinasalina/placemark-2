import cloudinary from '$lib/server/cloudinary';

export const imageStore = {
	async uploadImage(file: File) {
		const buffer = Buffer.from(await file.arrayBuffer());

		const result: any = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: 'placemark' }, (error, result) => {
					if (error) reject(error);
					else resolve(result);
				})
				.end(buffer);
		});

		return {
			url: result.secure_url,
			publicId: result.public_id
		};
	}
};
