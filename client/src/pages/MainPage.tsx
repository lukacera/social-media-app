// Imports 
import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../constants/SocketIoURL";
import { postType } from "../../../server/types/postType";

// Components
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import AllProfiles from "../components/AllProfiles";
import ViewProfile from "../components/ViewProfile";
import HeaderNav from "../components/HeaderNav";
import GreenMessage from "../components/UIComponents/GreenMessage";
import { UserContext } from "../hooks/UserContextHook";


function MainPage(): ReactNode {

    const [commentPosted, setCommentPosted] = useState<boolean>(false)

    const navigate = useNavigate()

    const currentURL = window.location.pathname;

    const { currentUserData } = useContext(UserContext)

    useEffect(() => {
        socket.on("newComment", (post: postType) => {
            // Show message only to user that submitted comment
            if (post.creator._id === currentUserData._id) {
                console.log("COmment posted!")
                setCommentPosted(true)
            }

        })

        return () => {
            socket.off("newPost")
        }
    }, [currentUserData._id])

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
            {commentPosted && <GreenMessage text="Comment posted!" />}
            <div className="grid grid-rows-[15%,85%]
            lg:h-screen bg-backgroundDark 
            text-white font-[Nunito]">
                <HeaderNav />
                <main className=" grid grid-cols-[10%_70%_20%]">
                    <Sidebar />

                    <div className="overflow-auto customWebkit">
                        {renderComponent}
                    </div>
                    <div>
                        <h3 className="text-[2rem] flex justify-center
                        font-bold pt-10">
                            Messages
                        </h3>
                    </div>
                </main>
            </div>
        </>
    );
}

export default MainPage;