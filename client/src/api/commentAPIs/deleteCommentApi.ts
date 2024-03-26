import { Types } from "mongoose";
import { baseUrl } from "../../constants/baseURL";
export const deleteComment = async (postId: Types.ObjectId, commentId: Types.ObjectId) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/posts/${postId}/deleteComment`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ commentId }) // Send commentId in req body
        });

        if (!response.ok) {
            throw new Error('Failed to delete comment!');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!' + error);
    }
};
