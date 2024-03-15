import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/getCurrentUserApi";
import { Link } from "react-router-dom";
const CurrentUser: React.FC = () => {
    const token = localStorage.getItem("token");
    interface CurrentUser {
        username: string,
        avatar: string
    }
    const [currentUserData, setCurrentUserData] = useState<CurrentUser>({
        avatar: "",
        username: ""
    })
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
            {token && (
                <div className="dropdown grid place-items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={currentUserData.avatar} alt="pic" />
                        <p className="profileName">{currentUserData.username}</p>
                    </div>
                    <div className="menu h-[10rem] w-[20rem] rounded-lg 
                    bg-profileColor border-[1px] border-borderGray
                    absolute top-28 hidden ">
                        <p className="flex justify-center pt-3 text-[1.3rem] 
                        font-bold tracking-wider">
                            <span></span>
                        </p>
                        <div className="flex justify-center gap-5">
                            <Link to={`/users/${currentUserData.username}`}>
                                <p className="dropdownButton">
                                    Edit profile
                                </p>
                            </Link>
                            <Link to={"/login"} onClick={() => localStorage.removeItem("token")}>
                                <p className="dropdownButton">
                                    Logout
                                </p>
                            </Link>

                        </div>
                    </div>
                </div>

            )}
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
