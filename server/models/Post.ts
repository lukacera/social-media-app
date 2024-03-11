import { model, Schema } from 'mongoose';
import { postType } from '../types/postType';
const postSchema = new Schema<postType>({
    creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    img: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

module.exports = model("Post", postSchema)