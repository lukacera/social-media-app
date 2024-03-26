import { Types } from 'mongoose';
import { userType } from './userType';

export type commentType = {
    creator: userType,
    post: Types.ObjectId,
    text: string,
    likes: Types.ObjectId[],
    commentCreatedAt: Date,
    _id: Types.ObjectId
}

