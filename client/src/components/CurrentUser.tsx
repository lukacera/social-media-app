import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/getCurrentUserApi";
import { Link } from "react-router-dom";
const CurrentUser: React.FC = () => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    // Declare type 
    interface CurrentUser {
        username: string,
        avatar: string
    }

    // Initialize states for current user's avatar and username 
    const [currentUserData, setCurrentUserData] = useState<CurrentUser>({
        avatar: "",
        username: ""
    })

    // Fetch data from server
    useEffect(() => {
        const fetchData = async () => {
            const fetched_data = await getCurrentUser();
            setCurrentUserData(() => ({
                avatar: fetched_data.avatar,
                username: fetched_data.username
            }))
        }

        fetchData()
    }, [])
    return (
        <>
            {/* If user is logged in, display his profileWrapper */}
            {token && (
                <div className="dropdown grid place-items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={currentUserData.avatar} alt="pic" />
                        <p className="profileName">{currentUserData.username}</p>
                    </div>
                    <div className="menu h-[10rem] w-[20rem] rounded-lg 
                    bg-profileColor border-[1px] border-borderGray
                    absolute top-28 hidden place-items-center">
                        <div className="flex gap-5">
                            <Link to={`/users/${currentUserData.username}`}>
                                <p className="dropdownButton">
                                    Edit profile
                                </p>
                            </Link>
                            {/* Remove token from localStorage when user clicks on logout button & redirect to login */}
                            <Link to={"/login"} onClick={() => localStorage.removeItem("token")}>
                                <p className="dropdownButton">
                                    Logout
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>

            )}
            {/* If no user is logged in, instead of profileWrapper, put login button */}
            {!token && (
                <div className="grid place-items-center">
                    <Link to={"/login"}>
                        <p className="px-5 py-3 text-xl font-[Nunito] tracking-wide  
                        bg-profileColor border-borderGray border-[1px]
                        hover:bg-white hover:text-black hover:border-none">
                            LOGIN
                        </p>
                    </Link>
                </div>
            )}
        </>
    )
};

export default CurrentUser;
