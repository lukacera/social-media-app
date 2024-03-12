import React, { ReactNode } from "react"
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = (): ReactNode => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[30rem] h-[45rem] bg-gradient-to-tr from-linearGradientStart
            to-linearGradientEnd text-white flex flex-col gap-20 rounded-lg">
                <div className="flex flex-col items-center gap-16">
                    <h2 className="flex pt-10 text-3xl
                        font-madimi-one tracking-widest">
                        BONDIFY
                    </h2>
                    <p className="text-3xl font-merryweather font-bold">Log in</p>
                </div>
                <form method="POST" onClick={(e) => e.preventDefault()}
                    className="flex flex-col items-center gap-10 w-[80%] mx-auto">
                    <div className="signInInputWrapper">
                        <FaUser />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none"
                            type="text" placeholder="Username" />
                    </div>
                    <div className="signInInputWrapper">
                        <FaUser />
                        <input className="bg-transparent placeholder:text-slate-200
                        focus:outline-none"
                            type="password" placeholder="Password" />
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

export default SignIn;
