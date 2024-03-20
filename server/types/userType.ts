import { Types } from "mongoose";
export type userType = {
    _id?: Types.ObjectId;
    name: string;
    surname: string;
    age: number;
    username: string;
    password: string;
    avatar?: string;
    friends?: string[];
    posts?: Types.ObjectId[];
    friendRequests?: string[];
    profCreatedAt?: Date
} 
