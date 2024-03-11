import { Types } from 'mongoose';

export type commentType = {
    creator: Types.ObjectId,
    text: string,
    likes: Types.ObjectId[]
}

