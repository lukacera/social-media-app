import React, { useContext } from "react"
import { FaPen } from "react-icons/fa";
import { UserContext } from "../../hooks/UserContextHook";
const Bio: React.FC<{ openModal: React.Dispatch<React.SetStateAction<boolean>> }> = ({ openModal }) => {

    const { targetUser, isCurrentUser } = useContext(UserContext)

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
                            <span>{targetUser.name}</span>
                        </p>
                        <p className="flex items-center gap-1">
                            <span>Surname:</span>
                            <span>{targetUser.surname}</span>
                        </p>
                    </div>
                    <p className="flex justify-center gap-2">
                        <span>Age:</span>
                        <span>{targetUser.age}</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-5 font-bold">
                <p className="flex justify-center gap-2">
                    <span>Friends:</span>
                    <span>{targetUser.friends?.length}</span>
                </p>
                <p className="flex justify-center gap-2">
                    <span>Posts:</span>
                    <span>{targetUser.posts?.length}</span>
                </p>
            </div>
        </div>


    )
};

export default Bio;
