import { baseUrl } from "../../constants/baseURL";
export const sendFriendRequest = async (targetUsername: string) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}/users/${targetUsername}/friendRequest`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to send request');
        }

        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error(`THERE WAS AN ERROR IN SENDING NEW REQUEST TO ${targetUsername} ! ` + error);
    }
};
