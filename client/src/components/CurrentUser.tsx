import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/getCurrentUserApi";
import { Link } from "react-router-dom";
import { getAvatarURL } from "../constants/avatarURL";
const CurrentUser: React.FC<{ token: string | null }> = ({ token }) => {
    // Get token from local storage
    console.log("currentUser")
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
            const fetchedData = await getCurrentUser();

            // Ensure avatar is always a string
            const avatar = fetchedData.avatar || ""; // Use an empty string as default if avatar is undefined
            setCurrentUserData(prevUserData => ({
                ...prevUserData,
                avatar,
                username: fetchedData.username
            }));
        };

        fetchData();
    }, []);
    return (
        <>
            {/* If user is logged in, display his profileWrapper */}
            {token && (
                <div className="dropdown grid place-items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={getAvatarURL(currentUserData.avatar)} alt="pic" />
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
                            <Link to={"/"} onClick={() => localStorage.removeItem("token")}>
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
                    <Link to={"/"}>
                        <p className="px-5 py-3 text-xl font-[Nunito] tracking-wide  
                        bg-profileColor border-borderGray text-white border-[1px]
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
