import { FormEvent, ReactNode, useEffect, useState } from "react"
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loginUser } from "../api/loginUser";


const Login = (): ReactNode => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Handle submit function
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await loginUser(username, password);
            console.log("User is logged in!")
        } catch (error) {
            console.log("Error occured while trying to log user in: " + error)
        }
    }

    useEffect(() => {
        console.log("User is: " + username)
        console.log("Password is: " + password)

    }, [username, password])
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
                    <div className="signInInputWrapper">
                        <FaUser />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none" placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" required />
                    </div>
                    <div className="signInInputWrapper">
                        <FaLock />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" required />
                    </div>
                    <div className="flex flex-col gap-16">
                        <button className="signInButton">
                            Login
                        </button>
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

export default Login;
