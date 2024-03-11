import { model, Schema } from 'mongoose';
import { commentType } from '../types/commentType';
const commentSchema = new Schema<commentType>({
    creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ],
    commentCreatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("Comment", commentSchema)