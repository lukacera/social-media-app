import { baseUrl } from "../../constants/baseURL";

export const getAllPosts = async () => {

    try {
        const response = await fetch(`${baseUrl}/posts/getAllPosts`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data.posts;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
