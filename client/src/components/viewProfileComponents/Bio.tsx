import React from "react"
import { FaPen } from "react-icons/fa";
import { userType } from "../../../../server/types/userType";

const Bio: React.FC<{
    isCurrentUser: boolean,
    userData: userType,
    openModal: React.Dispatch<React.SetStateAction<boolean>>
}> =
    ({ isCurrentUser, userData, openModal }) => {
        return (
            <div className="flex flex-col gap-14">
                <div className="flex flex-col items-center gap-10 relative">
                    <h3 className="font-merryweather text-3xl">Bio</h3>
                    {isCurrentUser && (
                        <div className="absolute left-20 bg-gradient-to-tl 
                  from-white to-linearGradientStart 
                  p-4 text-black rounded-full cursor-pointer"
                            onClick={() => openModal(true)}>
                            <FaPen />
                        </div>
                    )}
                    <div className="flex flex-col gap-5">
                        <div className="grid place-items-center gap-2">
                            <p className="flex items-center gap-1">
                                <span>Name:</span>
                                <span>{userData.name}</span>
                            </p>
                            <p className="flex items-center gap-1">
                                <span>Surname:</span>
                                <span>{userData.surname}</span>
                            </p>
                        </div>
                        <p className="flex justify-center gap-2">
                            <span>Age:</span>
                            <span>{userData.age}</span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-center gap-5 font-bold">
                    <p className="flex justify-center gap-2">
                        <span>Friends:</span>
                        <span>{userData.friends?.length}</span>
                    </p>
                    <p className="flex justify-center gap-2">
                        <span>Posts:</span>
                        <span>{userData.posts?.length}</span>
                    </p>
                </div>
            </div>


        )
    };

export default Bio;
