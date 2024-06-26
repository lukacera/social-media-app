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
        <div className="flex justify-center items-center h-screen bg-white
        ">
            <div className="w-[90%] sm:w-[30rem] max-h-[55rem] bg-backgroundDark 
            text-white flex border-2 border-black
            flex-col gap-16 rounded-lg py-10">
                <div className="flex flex-col items-center gap-10">
                    <div className="flex flex-col items-center gap-5">

                        <h2 className="flex text-3xl font-madimi-one tracking-widest">
                            BONDIFY
                        </h2>
                    </div>
                    <p className="text-3xl font-merryweather font-bold">Login</p>
                </div>
                <form method="POST" onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-10 w-[80%] mx-auto">
                    {/* Username input wrapper */}
                    <div className="signInInputWrapper">
                        <FaUser />
                        <input className="bg-transparent
                        focus:outline-none" placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" required />
                    </div>
                    {/* Password input wrapper */}
                    <div className="signInInputWrapper">
                        <FaLock />
                        <input className="bg-transparent
                        focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" required />
                    </div>
                    {/* Buttons div */}
                    <div className="flex flex-col gap-5">
                        <div className="grid place-items-center gap-5">
                            {/* Place error message if something went wrong */}
                            {errorValidation && (
                                <p className="text-white text-xl">
                                    {errorValidation}
                                </p>
                            )}
                            <button className="signInButton">
                                Login
                            </button>
                        </div>
                        <div className="flex flex-col gap-5 text-center">
                            <p>
                                If you don't have account, please sign up below
                            </p>
                            <Link to="/signup">
                                <p className="signInButton text-center">
                                    Sign up
                                </p>
                            </Link>
                        </div>
                    </div>
                </form>
                {/* Guest login */}
                <p className="rounded-full px-8 py-4
                            bg-backgroundDark text-white font-bold mx-auto font-exo
                            tracking-wide cursor-pointer
                            flex items-center gap-3
                            border-2 border-white"
                    onClick={() => handleSubmitGuest()}>
                    <span className="text-[1.3rem]">
                        <FaMask />
                    </span>
                    <span>Continue as guest</span>
                </p>
            </div>
        </div>
    )
};


export default Login