import { useState, useEffect } from "react"
import { getCurrentUser } from "../api/getCurrentUserApi";
import { userType } from "../../../server/types/userType";

const CurrentUser = () => {
    const [userProfileData, setUserProfileData] = useState<Partial<userType>>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            const fetched_data = await getCurrentUser();
            setUserProfileData(() => ({
                username: fetched_data.username,
                age: fetched_data.age,
                name: fetched_data.name,
                surname: fetched_data.surname,
                avatar: fetched_data.avatar.length > 0 ? fetched_data.avatar :
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
            }))
        }
        fetchData()
    }, [])
    return (
        <div className="dropdown grid place-items-center relative">
            <div className="profileWrapper absolute">
                <img className="w-12 h-12 rounded-full"
                    src={userProfileData.avatar} alt="" />
                <p className="profileName">{userProfileData.username}</p>
            </div>
            <div className="menu h-[10rem] w-[20rem] 
            bg-profileColor border-[1px] border-borderGray
            absolute top-28 right-5 duration-300 font-exo
            hidden rounded-lg grid-rows-[25%_75%]">
                <p className="flex justify-center pt-3 text-[1.3rem] 
                font-bold tracking-wider">
                    <span>{userProfileData.username}</span>
                </p>
                <div className="flex justify-center items-center gap-5">
                    <p className="dropdownButton">
                        Edit profile
                    </p>
                    <p className="dropdownButton">
                        Logout
                    </p>
                </div>
            </div>
        </div>
    )
};

export default CurrentUser;
