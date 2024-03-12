import React, { ReactNode } from "react"
import { Link } from "react-router-dom";

const SignUp = (): ReactNode => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[45rem] h-[55rem] bg-gradient-to-tr from-linearGradientStart
            to-linearGradientEnd text-white flex flex-col gap-20 rounded-lg">
                <div className="flex flex-col items-center gap-16">
                    <h2 className="flex pt-10 text-3xl
                        font-madimi-one tracking-widest">
                        BONDIFY
                    </h2>
                    <p className="text-3xl font-merryweather font-bold">Sign up</p>
                </div>
                <form method="POST" onClick={(e) => e.preventDefault()}
                    className="flex flex-col items-center gap-12 w-[80%] mx-auto">
                    <section className="flex flex-col gap-10">
                        <div className="flex gap-5">
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                focus:outline-none"
                                    type="text" placeholder="Name" name="name" required />
                            </div>
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                focus:outline-none"
                                    type="text" placeholder="Surname"
                                    name="surname" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-16 items-center">
                            <div className="signInInputWrapper max-w-[10rem]">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none w-full"
                                    type="number" placeholder="Age"
                                    name="age" required />
                            </div>
                            <div className="signInInputWrapper max-w-[15rem]">
                                <input className="bg-transparent placeholder:text-slate-200
                                        focus:outline-none"
                                    type="text" placeholder="Username"
                                    name="username" required />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none"
                                    type="password" placeholder="Password"
                                    name="password" required />
                            </div>
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none"
                                    type="password" placeholder="Confirm password"
                                    name="confirmPassword" required />
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col gap-16">
                        <button className="signInButton">
                            Sign up
                        </button>
                        <div className="flex flex-col items-center gap-5">
                            <p className="">If you already have an account, please proceed
                                to login page
                            </p>
                            <Link to="/login">
                                <p className="signInButton flex justify-center">
                                    Login
                                </p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;
