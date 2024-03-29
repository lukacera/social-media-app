import { Types } from "mongoose";
import { postType } from "./postType";
export type userType = {
    _id?: Types.ObjectId;
    name: string;
    surname: string;
    age: number;
    username: string;
    password: string;
    avatar?: string;
    friends?: string[];
    posts?: postType[];
    friendRequests?: string[];
    profCreatedAt?: Date
} 
