import { Types } from "mongoose";
export type userType = {
    name: string;
    surname: string;
    age: number;
    username: string;
    birthday: Date;
    password: string;
    avatar?: string;
    friends?: Types.ObjectId[];
    posts?: Types.ObjectId[];
    profCreatedAt?: Date
} 
