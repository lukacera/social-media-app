import React, { ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { userType } from "../../../server/types/userType";
import { newUser } from "../api/newUserApi";
const SignUp = (): ReactNode => {
    const navigate = useNavigate();

    const [userData, setUseruserData] = useState<userType>({
        name: "",
        surname: "",
        age: 0,
        password: "",
        username: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUseruserData(prevuserData => ({
            ...prevuserData,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        try {
            await newUser(userData);
            navigate("/login")
        } catch (error) {
            console.log("Error occured while trying to save User " + error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-slate-300">
            <div className="w-[45rem] h-[55rem] bg-gradient-to-tr from-linearGradientStart
            to-linearGradientEnd text-white flex flex-col gap-20 rounded-lg">
                <div className="flex flex-col items-center gap-16">
                    <h2 className="flex pt-10 text-3xl
                        font-madimi-one tracking-widest">
                        BONDIFY
                    </h2>
                    <p className="text-3xl font-merryweather font-bold">Sign up</p>
                </div>
                <form method="POST" onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-12 w-[80%] mx-auto">
                    <section className="flex flex-col gap-10">
                        <div className="flex gap-5">
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                focus:outline-none" type="text" value={userData.name}
                                    placeholder="Name" name="name" required autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                focus:outline-none"
                                    type="text" placeholder="Surname" value={userData.surname}
                                    name="surname" required autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-16 items-center">
                            <div className="signInInputWrapper max-w-[10rem]">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none w-full" value={userData.age === 0 ? "" : userData.age}
                                    type="number" placeholder="Age" min={10} max={120}
                                    name="age" required autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="signInInputWrapper max-w-[15rem]">
                                <input className="bg-transparent placeholder:text-slate-200
                                        focus:outline-none"
                                    type="text" placeholder="Username" value={userData.username}
                                    name="username" required autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none"
                                    type="password" placeholder="Password"
                                    value={userData.password} name="password"
                                    required autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="signInInputWrapper">
                                <input className="bg-transparent placeholder:text-slate-200
                                    focus:outline-none"
                                    type="password" placeholder="Confirm password"
                                    name="confirmPassword" required autoComplete="off" />
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col gap-16">
                        <button type="submit" className="signInButton">
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
