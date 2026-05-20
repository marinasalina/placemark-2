import cloudinary from '$lib/server/cloudinary';
//creates reusable service object
export const imageStore = {
	//function uploading image to cloudinary and returning URL
	//Receives uploaded image file
	async uploadImage(file: File) {
		//conver file to buffer for cloudinary upload
		const buffer = Buffer.from(await file.arrayBuffer()); //reads file binary data
		//Cloudinary upload stream uses callback style
		const result: any = await new Promise((resolve, reject) => {
			//Send file data directly to cloudinary
			cloudinary.uploader
				.upload_stream({ folder: 'placemark' }, (error, result) => {
					if (error) reject(error);
					else resolve(result);
				})
				//send file data to cloudinary
				.end(buffer);
		});
		//Cloudinary returns URL and public ID for the uploaded image, which we return to the caller. This allows us to store the image reference in our database and display it in our application.
		return {
			url: result.secure_url,
			publicId: result.public_id
		};
	},

	async deleteImage(publicId: string) {
		await cloudinary.uploader.destroy(publicId, {});
	}
};
