import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: Number,
        required: true
    },
    birthday: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    friends: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: Schema.ObjectId,
            ref: 'Post'
        }
    ],
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = model("User", userSchema)