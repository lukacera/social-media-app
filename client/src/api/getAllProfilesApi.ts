import { baseUrl } from "../constants/baseURL";

export const getAllProfiles = async () => {
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
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
