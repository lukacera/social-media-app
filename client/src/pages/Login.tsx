import { FormEvent, useContext, useState } from "react"
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authAPIs/loginUserApi";
import { ReactNode } from "react";
import { UserContext } from "../hooks/UserContextHook";
import { getCurrentUser } from "../api/fetchUsersAPIs/getCurrentUserApi";
import { FaMask } from "react-icons/fa6";

const Login = (): ReactNode => {

    const { setCurrentUserData } = useContext(UserContext)

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate()

    // Errors in login proccess(invalid username or password)
    const [errorValidation, setErrorValidation] = useState<string>('')


    // Fetch new currentUser data on login
    const fetchCurrentUser = async () => {
        try {
            const fetched_data = await getCurrentUser()
            setCurrentUserData(fetched_data)
        } catch (error) {
            console.error("Error occured while fetching current user! " + error)
        }

    }

    // Handle submit function
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // If type of fetched data is string, it means that it's error message
        const fetched_data = await loginUser(username, password);
        if (typeof (fetched_data) === "string") {
            setErrorValidation(fetched_data)
            return
        }
        // Login successful
        await fetchCurrentUser()
        navigate("/home")
    }

    // Guest login function
    const handleSubmitGuest = async () => {

        // Provide loginUser API with guest user credentials
        const fetched_data = await loginUser("guest", "guestguest");
        if (typeof (fetched_data) === "string") {
            setErrorValidation(fetched_data)
            return
        }

        await fetchCurrentUser()
        navigate("/home")
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 font-madimi-one tracking-wider">BONDIFY</h1>
                    <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 font-merryweather">Login</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {errorValidation && (
                        <p className="text-red-500 text-center">{errorValidation}</p>
                    )}
                    
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold">
                        Login
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Don't have an account?</p>
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors duration-300">
                        Sign up
                    </Link>
                </div>
                
                <div className="mt-8">
                    <button
                        onClick={handleSubmitGuest}
                        className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-semibold"
                    >
                        <FaMask />
                        <span>Continue as guest</span>
                    </button>
                </div>
            </div>
        </div>
    )
};


export default Login