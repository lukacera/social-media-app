import { baseUrl } from "../constants/baseURL";

export const editProfileImg = async (currentUserUsername: string, file: File) => {
    const token = localStorage.getItem("token")

    // Get file from params
    const formData = new FormData();
    formData.append('profileImg', file);
    console.log(formData)
    try {
        const response = await fetch(`${baseUrl}/users/${currentUserUsername}/updateImg`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update profile picture');
        }

        const data = response.json()
        return data;
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
