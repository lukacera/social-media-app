import { Types } from "mongoose";
import { baseUrl } from "../../constants/baseURL";
export const likePost = async (postId: Types.ObjectId) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/posts/${postId}/likePost`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to like post!');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!' + error);
    }
};
