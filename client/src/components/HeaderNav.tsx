import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import CurrentUser from "../components/CurrentUser";
import DisplayFriendRequests from "./DisplayFriendRequests";
import CreatePostModal from "./postComponents/CreatePostModal";
import CreatePostButton from "./postComponents/CreatePostButton";
// Icons
import { GiBackup } from "react-icons/gi";

const HeaderNav: React.FC = () => {
    const token = localStorage.getItem("token");
    const [createStatus, setCreateStatus] = useState<boolean>(false)

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
                        <CreatePostButton handleOpenModal={setCreateStatus} />

                        {/* If createStatus is true, it means that form for creating post should be open */}
                        {createStatus && (
                            <CreatePostModal closeModal={setCreateStatus} />
                        )}

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
