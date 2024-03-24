// Imports 
import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";
import Messages from "../components/Messages";



function MainPage(): ReactNode {

    const navigate = useNavigate()

    const currentURL = window.location.pathname;

    // Check if Url is /users/ which means that client tries to access user 
    // that has no username, which is invalid
    useEffect(() => {
        if (currentURL === "/users/") {
            navigate("/*")
        }

    }, [currentURL, navigate])


    const { username } = useParams<{ username?: string }>();

    const renderComponentBasedOnURL = (): ReactNode => {  // URL decides which component will be rendered

        if (currentURL === '/home') {
            return <Feed />;

        } else if (currentURL === '/users') {
            return <AllProfiles />;

        } else if (currentURL === `/users/${username}`) {
            return <ViewProfile />
        }
    };

    const renderComponent = renderComponentBasedOnURL()
    return (
        <>
            <div className="grid grid-rows-[15%,85%] h-screen bg-white dark:bg-backgroundDark text-white font-[Nunito]">
                <HeaderNav />
                <main className=" grid grid-cols-[10%_70%_20%]">
                    <Sidebar />
                    <div className="overflow-auto">
                        {renderComponent}
                    </div>
                    <Messages />
                </main>
            </div>
        </>
    );
}

export default MainPage;