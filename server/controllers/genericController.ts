import { Model } from "mongoose";
import { Request, Response } from "express";
const asyncHandler = require("express-async-handler")

export const getAllDocuments = <T>(Model: Model<T>, populateField?: string) =>
    asyncHandler(async (req: Request, res: Response) => {
        let documents;
        if (populateField) {
            documents = await Model.find().populate(populateField);
        } else {
            documents = await Model.find();

        }

        // Name field is plural, lowercase version of Model.modelname
        res.status(200).json({ [`${Model.modelName.toLowerCase()}s`]: documents });
    });
