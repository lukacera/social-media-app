import { model, Schema, Model } from 'mongoose';
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
        required: [true, "Posts must have some text!!"]
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
        default: Date.now()
    }
})


const postModel: Model<postType> = model<postType>("Post", postSchema);

export default postModel