import { baseUrl } from "../constants/baseURL";
export const acceptFriendRequest = async (targetUsername: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}/acceptFriendRequest`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to accept request');
        }

        const data = response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
