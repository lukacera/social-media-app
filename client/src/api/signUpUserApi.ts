import { baseUrl } from "../constants/baseURL";
import { userType } from "../../../server/types/userType";

export const registerUser = async (userData: userType) => {
    try {
        const response = await fetch(`${baseUrl}/auth/signUp`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();

        if (!response.ok) {
            const error = data.error;
            console.error('Failed to register user!' + error);
            return error
        }
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
