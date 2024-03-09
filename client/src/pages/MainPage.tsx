import "../assets/index.css";
// Imports 
import { GiBackup } from "react-icons/gi";
import { createRandomUser, USERS } from "../helpers/fakerHelper";

// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import { ReactNode } from "react";
function App(): ReactNode {
    const profileUser = createRandomUser()
    const renderComponentBasedOnURL = (): ReactNode => {
        window.scroll({
            top: 0
        })
        const currentURL = window.location.pathname;
        // URL decides which component will render
        if (currentURL === '/') {
            return <Feed />;
        } else if (currentURL === '/allProfiles') {
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
                <h1 className="flex justify-start pl-20 items-center text-4xl
                    font-[Inter] tracking-widest">Bondify</h1>
                {/* Profile div */}
                <div className="flex justify-center items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={profileUser.avatar} alt="" />
                        <p className="profileName">{profileUser.username}</p>
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
