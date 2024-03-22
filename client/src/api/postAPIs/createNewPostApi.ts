import { baseUrl } from "../../constants/baseURL";
export const createNewPost = async (file: File, text: string) => {

    const token = localStorage.getItem("token")
    const formData = new FormData();
    formData.append("img", file);
    formData.append("text", text)
    try {
        const response = await fetch(`${baseUrl}/posts/createPost`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
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
