// Imports 
import { ReactNode, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";
import Messages from "../components/Messages";
import { UserContext } from "../hooks/UserContextHook";
// API
import { getUser } from "../api/fetchUsersAPIs/getUserApi";

function MainPage(): ReactNode {
    const navigate = useNavigate()

    // Get data for current user
    const { currentUserData, setIsCurrentUser,
        setTargetUser } = useContext(UserContext);

    const currentURL = window.location.pathname;
    // Get username from params
    const { username } = useParams<{ username?: string }>();

    // Fetch data from getUser API
    useEffect(() => {
        const fetchData = async () => {
            if (username) {
                try {
                    // Try to fetch targetUserData from DB, if it fails,
                    // settargetUserData will not be called
                    const targetUserData = await getUser(username);

                    if (targetUserData.username === currentUserData.username) {
                        setIsCurrentUser(true)
                    } else {
                        setIsCurrentUser(false)
                    }
                    setTargetUser(targetUserData)
                } catch (error) {
                    // If error occured, redirect to errorPage
                    navigate("/*")
                }

            }
            // /users/ means that no username was provided, so render errorPage
            else if (currentURL === "/users/") {
                navigate("/*")
            }
        }

        fetchData()
    }, [username, currentURL, setTargetUser, currentUserData.username, navigate, setIsCurrentUser])

    const renderComponentBasedOnURL = (): ReactNode => {
        // URL decides which component will render
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