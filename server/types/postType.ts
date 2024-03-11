import { Types } from 'mongoose';

export type postType = {
    creator: Types.ObjectId;
    img: string,
    text: string,
    comments: Types.ObjectId[],
    likes: Types.ObjectId[],
    postCreatedAt: Date
}

