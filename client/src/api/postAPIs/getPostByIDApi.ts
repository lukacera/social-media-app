import { Types } from "mongoose";
import { baseUrl } from "../../constants/baseURL";
import { postType } from "../../../../server/types/postType";

export const getOnePost = async (postId: Types.ObjectId) => {

    interface dataPostType {
        post: postType
    }
    try {
        const response = await fetch(`${baseUrl}/posts/${postId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }

        // Convert to json and return post
        const data: dataPostType = await response.json();

        return data.post;
    } catch (error) {
        throw new Error('Operation failed! ' + error);
    }
};
