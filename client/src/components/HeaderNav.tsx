import React from "react";
import CurrentUser from "../components/CurrentUser";
import { GiBackup } from "react-icons/gi";
import { Link } from "react-router-dom";
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
            <div className="flex justify-start pl-20 items-center text-4xl
                        font-madimi-one tracking-widest">
                <Link to={token ? "/home" : "/"}>
                    <h1 data-testid="cypress-title" >Bondify</h1>
                </Link>
            </div>
            {/* Profile div */}
            < CurrentUser token={token} />
        </div>
    )
};

export default HeaderNav;
