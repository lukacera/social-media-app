const multer = require("multer")
import { Multer, FileFilterCallback } from "multer";


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


// Export upload so other files can import it

export const upload: Multer = multer({
    storage: storage,
    fileFilter: fileFilter
})

