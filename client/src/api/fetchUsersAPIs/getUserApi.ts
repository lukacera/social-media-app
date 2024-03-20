import { userType } from "../../../../server/types/userType";
import { baseUrl } from "../../constants/baseURL";

// Get info about user by username
export const getUser = async (username: string) => {
    interface Data {
        user: userType
    }
    // Get JWT from localstorage
    try {
        const response = await fetch(`${baseUrl}/users/${username}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        const data: Data = await response.json();
        // JSON is in {user: data} format
        return data.user;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
