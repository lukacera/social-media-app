import { baseUrl } from "../../constants/baseURL";
export const deleteReceivedFriendRequest = async (targetUsername: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}/deleteReceivedRequest`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete request');
        }
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
