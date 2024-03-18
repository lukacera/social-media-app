import React from "react";
import { Link } from "react-router-dom";

// Components
import CurrentUser from "../components/CurrentUser";
import DisplayFriendRequests from "./DisplayFriendRequests";

// Icons
import { GiBackup } from "react-icons/gi";


const HeaderNav: React.FC = () => {
    const token = localStorage.getItem("token");
    return (
        <div className="grid grid-cols-[10%_70%_20%] border-b-2 border-borderGray">
            <div className="text-6xl flex justify-center
                    items-center">
                <Link to={token ? "/home" : "/"}>
                    <svg width="1em" height="1em">
                        {/* Setting linear gradient for logo */}
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#65ade3" offset="0%" />
                            <stop stopColor="#094572" offset="100%" />
                        </linearGradient>
                        {/* @ts-expect-error Style can be declared here */}
                        <GiBackup style={{ fill: "url(#blue-gradient)" }} />
                    </svg>
                </Link>

            </div>
            <div className="flex justify-between ml-20 mr-10
            items-center">
                <Link to={token ? "/home" : "/"}>
                    <h1 className="text-4xl font-madimi-one tracking-widest" data-testid="cypress-title" >Bondify</h1>
                </Link>
                {token && (
                    <div className="flex gap-20 items-center">
                        <p className="flex items-center gap-3 font-merryweather">
                            <span className="text-xl">New post</span>
                            <span className="text-2xl px-4 py-2 bg-white 
                                                 text-black rounded-full cursor-pointer">
                                +
                            </span>
                        </p>
                        < DisplayFriendRequests />
                    </div>

                )}

            </div>
            {/* Profile div */}
            < CurrentUser token={token} />
        </div>
    )
};

export default HeaderNav;
