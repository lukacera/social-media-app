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
        required: [true, "User must have an username!"]
    },
    password: {
        type: String,
        required: [true, "User must have a name!"]
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
    profCreatedAt: {
        type: Date,
        default: Date.now()
    }

})

const UserModel: Model<userType> = model<userType>("User", userSchema);

export default UserModel
