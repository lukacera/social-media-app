import { baseUrl } from "../../constants/baseURL";
import { postType } from "../../../../server/types/postType";
export const getAllPosts = async () => {
    interface PostsData {
        posts: postType[]
    }
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
        const data: PostsData = await response.json();
        return data.posts;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
