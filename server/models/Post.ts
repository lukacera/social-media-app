import { model, Schema } from 'mongoose';

const postSchema = new Schema({
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