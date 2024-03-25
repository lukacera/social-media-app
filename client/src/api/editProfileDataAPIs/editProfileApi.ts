import { userType } from "../../../../server/types/userType";
import { baseUrl } from "../../constants/baseURL";

// Username and password are not updatable
type UpdateType = Omit<Omit<userType, "password">, "username">;

export const editProfile = async (targetUsername: string, update: UpdateType) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            throw new Error('Failed to update profile info');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
