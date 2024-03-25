import { model, Schema, Model } from 'mongoose';
import { commentType } from '../types/commentType';

const commentSchema = new Schema<commentType>({
    creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,
        required: [true, "Comments can't be empty!"]
    },
    likes: [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ],
    commentCreatedAt: {
        type: Date
    }
})


const commentModel: Model<commentType> = model<commentType>("Comment", commentSchema);

export default commentModel