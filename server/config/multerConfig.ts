import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback, MulterError, Options } from "multer";
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Check if environment variables are set
if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary environment variables are missing. Please check your .env file.");
    process.exit(1);
}
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// Create Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        public_id: (req: Request, file: Express.Multer.File) => 'computed-filename-using-request',
    } as Options
});

// Initialize multer with Cloudinary storage
export const parser = multer({ storage: storage });

// Middleware function to handle file uploads
export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {

    // Use 'parser' middleware to handle file uploads
    parser.single('img')(req, res, function (err: any) {
        if (err) {
            // Handle multer errors here
            return res.status(400).json({ error: 'File upload failed.' });
        }

        // If no error, call next() to pass control to the next middleware
        return next();
    });
}

interface CustomRequestPublicID extends Request {
    publicId?: string
}
// Middleware function to upload file to Cloudinary
export async function uploadToCloudinary(req: CustomRequestPublicID, res: Response, next: NextFunction) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        // Extract publicId from the result
        const publicId = result.public_id;

        // Attach publicId to req object to pass it to the next middleware
        req.publicId = publicId;

        // Call next middleware
        return next();
    } catch (error) {  // Handle error case
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading file to Cloudinary" });
    }
}
