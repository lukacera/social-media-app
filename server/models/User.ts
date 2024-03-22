import { model, Schema, Model } from 'mongoose';
import { userType } from '../types/userType';
const userSchema = new Schema<userType>({
    name: {
        type: String,
        required: [true, "User must have a name!"]
    },
    surname: {
        type: String,
        required: [true, "User must have a surname!"]
    },
    age: {
        type: Number,
        required: [true, "User must have a age!"]
    },
    username: {
        type: String,
        required: [true, "User must have an username!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User must have a password!"]
    },
    avatar: {
        type: String,
        default: "lypaf2cqlq7xfzl3mwcm"
    },
    friends: [{ type: String }],
    friendRequests: [{ type: String }],
    posts: [
        {
            type: Schema.ObjectId,
            ref: 'Post'
        }
    ],
    profCreatedAt: {
        type: Date,
        default: Date.now()
    }

})

const UserModel: Model<userType> = model<userType>("User", userSchema);

export default UserModel
