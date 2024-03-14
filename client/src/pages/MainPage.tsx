import "../assets/index.css";
// Imports 
import { GiBackup } from "react-icons/gi";
import { USERS } from "../helpers/fakerHelper";
import { getCurrentUser } from "../api/getCurrentUserApi";


// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import { ReactNode, useEffect, useState } from "react";

import { userType } from "../../../server/types/userType";
function App(): ReactNode {
    const [userProfileData, setUserProfileData] = useState<Partial<userType>>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            const fetched_data: userType = await getCurrentUser();
            setUserProfileData(() => ({
                username: fetched_data.username,
                age: fetched_data.age,
                name: fetched_data.name,
                surname: fetched_data.surname,
                avatar: fetched_data.avatar
            }))
        }
        fetchData()
    }, [])
    const renderComponentBasedOnURL = (): ReactNode => {
        const currentURL = window.location.pathname;
        // URL decides which component will render
        if (currentURL === '/') {
            return <Feed />;
        } else if (currentURL === '/profiles') {
            return <AllProfiles />;
        }
    };
    const renderComponent = renderComponentBasedOnURL()
    return (
        <div className="grid grid-rows-[15%,85%] h-screen bg-white
            dark:bg-backgroundDark text-white font-[Nunito]">
            <div className="grid grid-cols-[10%_70%_20%] border-b-2 border-borderGray">
                <div className="text-6xl flex justify-center
                    items-center">
                    <svg width="1em" height="1em">
                        {/* Setting linear gradient for logo */}
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#65ade3" offset="0%" />
                            <stop stopColor="#094572" offset="100%" />
                        </linearGradient>
                        {/* @ts-expect-error Style can be declared here */}
                        <GiBackup style={{ fill: "url(#blue-gradient)" }} />
                    </svg>
                </div>
                <h1 data-testid="cypress-title" className="flex justify-start pl-20 items-center text-4xl
                    font-madimi-one tracking-widest">Bondify</h1>
                {/* Profile div */}
                <div className="flex justify-center items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={userProfileData.avatar} alt="" />
                        <p className="profileName">{userProfileData.username}</p>
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-[10%_70%_20%]">
                {/* Sidebar */}
                < Sidebar />
                {/* Feed div */}
                <div className="overflow-auto">
                    {renderComponent}
                </div>
                {/* Message div, another sidebar */}
                <div className="border-l-2 border-borderGray flex
                    flex-col items-center gap-10 pt-10">
                    <h3 className="text-2xl">Messages</h3>
                    {USERS.map((user, index) => (
                        <div className="profileWrapper" key={index}>
                            <img className="w-12 h-12 rounded-full"
                                src={user.avatar} alt={user.username} />
                            <p className="profileName">{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
