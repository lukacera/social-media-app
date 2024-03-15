// Imports 
import { USERS } from "../helpers/fakerHelper";
import { ReactNode } from "react";
// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";
import { useParams } from "react-router-dom";
function MainPage(): ReactNode {

    // Get token from localStorage
    const token = localStorage.getItem("token")

    const { username } = useParams<{ username?: string }>();

    const renderComponentBasedOnURL = (): ReactNode => {
        const currentURL = window.location.pathname;
        // URL decides which component will render
        if (currentURL === '/') {
            return <Feed />;
        } else if (currentURL === '/users') {
            return <AllProfiles />;
        } else {
            return <ViewProfile username={username || ""} />
        }
    };
    const renderComponent = renderComponentBasedOnURL()
    return (
        <div className="grid grid-rows-[15%,85%] h-screen bg-white
            dark:bg-backgroundDark text-white font-[Nunito]">
            {/* Header nav */}
            < HeaderNav />
            {/* Main part of page*/}
            {token && (
                <main className=" grid grid-cols-[10%_70%_20%]">
                    {/* Sidebar */}
                    < Sidebar />
                    {/* Feed div */}

                    <div className="overflow-auto">
                        {renderComponent}
                    </div>
                    {/* Message div, another sidebar */}
                    {token && (
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
                    )}

                </main>
            )}
            {!token && (
                <p className="pageNotFoundParagraph">Page not found!</p>
            )}
        </div>
    );
}

export default MainPage;
