import { Types } from "mongoose";
import { baseUrl } from "../../constants/baseURL";
export const createNewComment = async (postId: Types.ObjectId, text: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/posts/${postId}/createNewComment`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ text }) // Send text in req.body
        });

        if (!response.ok) {
            throw new Error('Failed to create new comment!');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!' + error);
    }
};
