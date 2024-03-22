const multer = require("multer")
import { Multer, FileFilterCallback } from "multer";
import { handleUpload } from "./cloudinaryConfig";
import { NextFunction, Request, Response } from "express";

// Define required multer options for storage

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage: Multer = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        cb(null, "./uploads/");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// Filter files, so that only images are accepted
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// Define customRequest for publicID

interface CustomRequest extends Request {
    publicId?: string;
    file?: Express.Multer.File
}
export const uploadToCloudinary = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return
        }
        console.log("Upload User img to cloudinary!")
        // Upload file to Cloudinary
        const result = await handleUpload(req.file);

        // Extract publicId from the result
        const publicId = result;

        // Attach publicId to req object to pass it to the next middleware
        req.publicId = publicId;

        return
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        res.status(500).json({ message: "Error uploading file to Cloudinary" });
    }
};

// Export upload so other files can import it

export const upload: Multer = multer({
    storage: storage,
    fileFilter: fileFilter
})

