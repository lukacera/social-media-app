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
    birthday: {
        type: Date,
        required: [true, "User must have a birthday!"]
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
        required: [true, "User must have a name!"]
    },
    profCreatedAt: {
        type: Date,
        default: Date.now()
    }

})

const UserModel: Model<userType> = model<userType>("User", userSchema);

export default UserModel
