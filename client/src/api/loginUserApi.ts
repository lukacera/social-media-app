import { baseUrl } from "../constants/baseURL";

// Log user in and get JWT for that user
export const loginUser = async (username: string, password: string) => {
    const loginCredentials = {
        username: username,
        password: password
    }
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginCredentials) // Send login credentials as JSON in req.body

        });
        const data = await response.json()
        if (!response.ok) {
            console.log(data)
            console.log('Failed to fetch profiles');
            // Data.error returns string, that consists of error
            return data.error
        }
        // Set token in localStorage
        console.log(data.token)
        localStorage.setItem("token", data.userData.token)

        // Return object with values for user that is logged in
        return data.userData
    } catch (error) {
        throw new Error('Operation failed!');
    }
};
