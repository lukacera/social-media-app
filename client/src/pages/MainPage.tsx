// Imports 
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userType } from "../../../server/types/userType";

// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";
import Messages from "../components/Messages";
// API
import { getUser } from "../api/getUserApi";
import { getCurrentUser } from "../api/getCurrentUserApi";

function MainPage(): ReactNode {
    const navigate = useNavigate()
    // Get data for current user
    const [currentUserData, setCurrentUserData] = useState<userType>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: "",
        avatar: "",
        friends: [],
        posts: []
    });

    // Logged in user 
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)

    // Fetch currentUser's info on first render
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser();
            setCurrentUserData(user);
        };

        fetchCurrentUser();
    }, [isCurrentUser]);



    // Initialize state of data on first render
    const [targetUserData, settargetUserData] = useState<userType>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: "",
        avatar: "",
        friends: [],
        posts: [],
        profCreatedAt: undefined
    });


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
                    settargetUserData(targetUserData)
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
    }, [username, currentURL, currentUserData.username, navigate])

    const renderComponentBasedOnURL = (): ReactNode => {
        // URL decides which component will render
        if (currentURL === '/home') {
            return <Feed />;
        } else if (currentURL === '/users') {

            return <AllProfiles currentUser={currentUserData} />;
        } else if (currentURL === `/users/${username}`) {
            return <ViewProfile userData={targetUserData} isCurrentUser={isCurrentUser} />

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
