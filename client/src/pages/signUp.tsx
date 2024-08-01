import React, { ReactNode, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { userType } from "../../../server/types/userType";
import { registerUser } from "../api/authAPIs/signUpUserApi";
import { FaEnvelope, FaLock, FaBirthdayCake, FaUser } from "react-icons/fa";

const SignUp = (): ReactNode => {
    interface ExtendUserType extends userType {
        confirmPassword: string
    }
    // Set initial state for new user data, for registration
    const [userData, setUseruserData] = useState<ExtendUserType>({
        name: "",
        surname: "",
        age: 0,
        password: "",
        username: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()
    // Handle error message, if some credentials are invalid
    const [errorMessage, setErrorMessage] = useState<string>("")

    // Handle change of inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUseruserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const fetched_data = await registerUser(userData);
            if (typeof (fetched_data) === "string") {
                setErrorMessage(fetched_data)
                return
            }
            // On successful signup, navigate to login page
            navigate("/")
        } catch (error) {
            console.error("Error occured while trying to save User " + error)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 my-8 transition-all duration-300 ease-in-out">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 font-madimi-one tracking-wider">BONDIFY</h1>
                    <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 font-merryweather">Sign Up</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="text"
                                placeholder="Surname"
                                name="surname"
                                value={userData.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="number"
                                placeholder="Age"
                                name="age"
                                value={userData.age === 0 ? "" : userData.age}
                                onChange={handleChange}
                                min={10}
                                max={120}
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-800 dark:text-white transition-colors duration-300"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    {errorMessage && (
                        <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
                    )}
                    
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold">
                        Sign Up
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Already have an account?</p>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors duration-300">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default SignUp;
