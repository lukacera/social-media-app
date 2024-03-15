import { baseUrl } from "../constants/baseURL";

// Get info about user that is logged in
export const getCurrentUser = async () => {
    // Get JWT from localstorage
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/auth/myProfile`, {
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

        // JSON is in {usersData : data} format
        return data.usersData;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
