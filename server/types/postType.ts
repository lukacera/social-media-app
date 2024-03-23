import { Types } from 'mongoose';
import { userType } from './userType';
export type postType = {
    creator: userType;
    img: string,
    text: string,
    comments: Types.ObjectId[],
    likes: Types.ObjectId[],
    postCreatedAt: Date,
    _id?: Types.ObjectId
}

