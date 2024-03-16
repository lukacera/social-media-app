// Imports 
import { USERS } from "../helpers/fakerHelper";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { userType } from "../../../server/types/userType";

// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";

// API
import { getUser } from "../api/getUserApi";
import { getCurrentUser } from "../api/getCurrentUserApi";

function MainPage(): ReactNode {
    // Get data for current user
    const [currentUser, setCurrentUser] = useState<userType>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: "",
        avatar: "",
        friends: [],
        posts: []
    });
    // State for detecting if profile that user wants to visit is actually his
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)

    // Fetch currentUser's info on first render
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);
        };

        fetchCurrentUser();
    }, []);


    const currentURL = window.location.pathname;
    // Get username from params
    const { username } = useParams<{ username?: string }>();

    const [isErrorPage, setIsErrorPage] = useState<boolean>(false)
    // Initialize state of data on first render
    const [userData, setUserData] = useState<userType>({
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

    // Fetch data from getUser API, by usernamefetchData
    useEffect(() => {
        const fetchData = async () => {
            if (username) {
                try {
                    // Try to fetch userData from DB, if it fails,
                    // setUserData will not be called
                    const userData = await getUser(username);
                    if (userData.username === currentUser.username) {
                        setIsCurrentUser(true)
                    }
                    setUserData(userData)
                } catch (error) { // If error occured, render ErrorPage
                    setIsErrorPage(true);
                }

            }
            // If url is exactly /users/ , set errorPage to true, because no username is "" 
            else if (currentURL === "/users/") {
                setIsErrorPage(true)
            }
        }

        fetchData()
    }, [username, currentURL])

    const renderComponentBasedOnURL = (): ReactNode => {
        // URL decides which component will render
        if (currentURL === '/home') {
            return <Feed />;
        } else if (currentURL === '/users') {

            return <AllProfiles currentUser={currentUser} />;
        } else if (currentURL === `/users/${username}`) {
            // If there was no error, render profile
            if (!isErrorPage) {
                return <ViewProfile userData={userData} isCurrentUser={isCurrentUser} />
            }
        }
    };
    const renderComponent = renderComponentBasedOnURL()
    return (
        <>
            {!isErrorPage && (
                <div className="grid grid-rows-[15%,85%] h-screen bg-white
            dark:bg-backgroundDark text-white font-[Nunito]">
                    {/* Header nav */}
                    < HeaderNav />
                    {/* Main part of page*/}
                    <main className=" grid grid-cols-[10%_70%_20%]">
                        {/* Sidebar */}
                        < Sidebar />
                        {/* Feed div, component is rendered by URL */}
                        <div className="overflow-auto">
                            {renderComponent}
                        </div>
                        {/* Message div, right sidebar */}
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

                    </main>
                </div>
            )}
            {isErrorPage && (
                <ErrorPage />
            )}
        </>


    );
}

export default MainPage;
