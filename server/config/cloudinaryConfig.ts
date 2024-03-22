const cloudinary = require('cloudinary').v2
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function handleUpload(file: Express.Multer.File) {
    try {
        const res = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
        });
        console.log(res.public_id)
        return res.public_id;
    } catch (error) {
        console.error("Error occured while updating cloudinary:" + error)
    }


}