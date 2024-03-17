import { Types } from "mongoose";
export type userType = {
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
