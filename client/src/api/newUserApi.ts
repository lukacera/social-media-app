import { baseUrl } from "../constants/baseURL";
import { userType } from "../../../server/types/userType";

export const newUser = async (userData: userType) => {
    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to make new profile');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
