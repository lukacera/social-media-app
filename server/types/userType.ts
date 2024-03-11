import { Types } from "mongoose";
export type userType = {
    name: string;
    surname: string;
    age: number;
    username: string;
    birthday: number;
    avatar: string;
    friends: Types.ObjectId[];
    posts: Types.ObjectId[];
    password: string;
} 
