import { FormEvent, useState } from "react"
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authAPIs/loginUserApi";
import { ReactNode } from "react";

const Login = (): ReactNode => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()

    // Errors in login proccess(invalid username or password)
    const [errorValidation, setErrorValidation] = useState<string>('')
    // Handle submit function
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // If type of fetched data is string, it means that it's error message
        const fetched_data = await loginUser(username, password);
        if (typeof (fetched_data) === "string") {
            setErrorValidation(fetched_data)
            return
        }
        // Signup successful, redirect to home page
        navigate("/home")
    }
    return (
        <div className="flex justify-center items-center h-screen bg-slate-300">
            <div className="w-[30rem] h-[45rem] bg-gradient-to-tr from-linearGradientStart
            to-linearGradientEnd text-white flex flex-col gap-20 rounded-lg">
                <div className="flex flex-col items-center gap-16">
                    <h2 className="flex pt-10 text-3xl
                        font-madimi-one tracking-widest">
                        BONDIFY
                    </h2>
                    <p className="text-3xl font-merryweather font-bold">Log in</p>
                </div>
                <form method="POST" onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-10 w-[80%] mx-auto">
                    {/* Username input wrapper */}
                    <div className="signInInputWrapper">
                        <FaUser />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none" placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" required />
                    </div>
                    {/* Password input wrapper */}
                    <div className="signInInputWrapper">
                        <FaLock />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" required />
                    </div>
                    {/* Buttons div */}
                    <div className="flex flex-col gap-8">
                        <div className="grid place-items-center gap-5">
                            {/* Place error message if something went wrong */}
                            {errorValidation && (
                                <p className="text-black text-xl">
                                    {errorValidation}
                                </p>
                            )}
                            <button className="signInButton">
                                Login
                            </button>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p>If you don't have account, please sign up below</p>
                            <Link to="/signup">
                                <p className="signInButton flex justify-center">
                                    Sign up
                                </p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};


export default Login