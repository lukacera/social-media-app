import { baseUrl } from "../constants/baseURL";
export const deleteFriendRequest = async (targetUsername: string) => {
    const token = localStorage.getItem("token")
    console.log(token)
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}/friendRequest`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete request');
        }

        const data = response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
