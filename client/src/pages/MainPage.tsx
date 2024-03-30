// Imports 
import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";


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


    const { username } = useParams<{ username?: string }>()


    const renderComponentBasedOnURL = () => {
        if (currentURL === '/home') {
            return <Feed />;
        } else if (currentURL === '/users') {
            return <AllProfiles />;
        } else if (currentURL === `/users/${username}`) {
            return <ViewProfile username={username || ""} />;
        }
    };

    const renderComponent = renderComponentBasedOnURL()
    return (
        <>
            <div className="grid bg-backgroundDark text-white font-[Nunito]
            sm:grid-rows-[15%,85%] sm:h-screen">
                <HeaderNav />
                <main className=" grid grid-cols-[10%_70%_20%]">
                    <Sidebar />
                    <div className="overflow-auto customWebkit">
                        {renderComponent}
                    </div>
                    <div className="border-l-2 border-borderGray">
                        <h3 className="flex justify-center font-bold pt-10 break-words">
                            Messages
                        </h3>
                    </div>
                </main>
            </div>
        </>
    );
}

export default MainPage;