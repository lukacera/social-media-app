import { model, Schema, Model } from 'mongoose';
import { postType } from '../types/postType';
const postSchema = new Schema<postType>({
    creator: {
        type: Schema.ObjectId,
        ref: "User",
        required: [true, "Post must have it's creator!"]
    },
    img: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        required: [true, "Posts must have some text!"]
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
    ],
    postCreatedAt: {
        type: Date,
        required: true
    }
})


const postModel: Model<postType> = model<postType>("Post", postSchema);

export default postModel