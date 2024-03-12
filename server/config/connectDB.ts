import mongoose from "mongoose";

const mongoDB: string = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/mydatabase"
export const connectToDB = async (): Promise<void> => {
    mongoose.connect(mongoDB)
        .then(() => console.log("Connected to db!"))
        .catch((error: Error) => console.error("Error connecting to db:", error));
}
