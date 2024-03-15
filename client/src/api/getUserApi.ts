import { baseUrl } from "../constants/baseURL";

// Get info about user by username
export const getUser = async (username: string) => {
    // Get JWT from localstorage
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${username}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        const data = await response.json();

        // JSON is in {user: data} format
        return data.user;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
