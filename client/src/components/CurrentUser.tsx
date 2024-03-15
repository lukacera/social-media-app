import { useEffect, useState } from "react";
import { userType } from "../../../server/types/userType";
import { getCurrentUser } from "../api/getCurrentUserApi";
import { Link } from "react-router-dom";
const CurrentUser: React.FC = () => {
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
        <div className="dropdown grid place-items-center">
            <div className="profileWrapper">
                <img className="w-12 h-12 rounded-full"
                    src={currentUserData.avatar} alt="pic" />
                <p className="profileName">{currentUserData.username}</p>
            </div>
            <div className="menu h-[10rem] w-[20rem] 
            bg-profileColor border-[1px] border-borderGray
            absolute top-28 right-5 duration-300 font-exo
            hidden rounded-lg grid-rows-[25%_75%]">
                <p className="flex justify-center pt-3 text-[1.3rem] 
                font-bold tracking-wider">
                    <span></span>
                </p>
                <div className="flex justify-center items-center gap-5">
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
    )
};

export default CurrentUser;
