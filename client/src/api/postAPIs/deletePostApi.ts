import { Types } from "mongoose";
import { baseUrl } from "../../constants/baseURL";
export const deletePost = async (targetId: Types.ObjectId | undefined) => {

    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`${baseUrl}/posts/${targetId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create new post');
        }

        const data = response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
