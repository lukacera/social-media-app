import React from "react"
import { FaPen } from "react-icons/fa";
import { userType } from "../../../server/types/userType";

const ProfileImg: React.FC<{ isCurrentUser: boolean, userData: userType }> = ({ isCurrentUser, userData }) => {
    return (
        <div className="flex flex-col place-items-center gap-10 
            w-[70%] mx-auto">
            <div className="relative">
                <img className="w-[25em] rounded-full" src={userData.avatar} alt="User picture" />
                {isCurrentUser && (
                    <div className="absolute right-0 bottom-0 bg-gradient-to-tl 
                  from-white to-linearGradientStart 
                  p-3 text-black rounded-full cursor-pointer">
                        <FaPen />
                    </div>
                )}
            </div>

            <h2 className="text-[2.4rem] font-bold">{userData.username}</h2>
        </div>
    )
};

export default ProfileImg;
