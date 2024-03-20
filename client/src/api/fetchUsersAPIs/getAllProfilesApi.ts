import { baseUrl } from "../../constants/baseURL";
import { userType } from "../../../../server/types/userType";
export const getAllProfiles = async () => {
    interface UserData {
        users: userType[]
    }
    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        const data: UserData = await response.json();
        return data.users;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
