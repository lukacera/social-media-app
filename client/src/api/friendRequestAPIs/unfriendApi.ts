import { baseUrl } from "../../constants/baseURL";
export const unfriendUser = async (targetUsername: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}/deleteFriend`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete friend');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(`THERE WAS AN ERROR WHEN PROGRAM TRIED TO DELETE FRIEND ${targetUsername} ! ` + error);
    }
};
