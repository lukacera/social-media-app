import { Model, Document } from "mongoose";
import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

export const getAllDocuments = <T>(
    Model: Model<T>,
    populateFields: string[]
) =>
    asyncHandler(async (req: Request, res: Response) => {
        let documents;

        if (populateFields && populateFields.length > 0) {
            // If populateFields is provided and not empty
            const populateOptions = populateFields.map(field => {
                // Check if field is nested
                if (field.includes(".")) {
                    // Split nested field by dot and populate each part
                    const [firstField, ...restFields] = field.split(".");
                    return { path: firstField, populate: { path: restFields.join(".") } };
                } else {
                    return { path: field };
                }
            });
            documents = await Model.find().populate(populateOptions);
        } else {
            documents = await Model.find();
        }

        // Name field is plural, lowercase version of Model.modelname
        res.status(200).json({ [`${Model.modelName.toLowerCase()}s`]: documents });
    });