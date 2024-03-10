import { model, Schema } from 'mongoose';

const commentSchema = new Schema({
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
    ]
}, { timestamps: true })

module.exports = model("Comment", commentSchema)