import React, { useEffect, useState } from "react"
import { FaPen } from "react-icons/fa";
import { socket } from "../../constants/SocketIoURL";
import { userType } from "../../../../server/types/userType";
const Bio: React.FC<{
    openModal: React.Dispatch<React.SetStateAction<boolean>>,
    targetUser: userType,
    isCurrentUser: boolean
}> = ({ openModal, targetUser, isCurrentUser }) => {

    const [friendsNumber, setFriendsNumber] = useState<number>(0)


    useEffect(() => {
        targetUser.friends && setFriendsNumber(targetUser.friends.length)
    }, [targetUser.friends])

    useEffect(() => {
        socket.on("unfriendUser", (targetUserFromSocket: userType) => {
            if (targetUser.username === targetUserFromSocket.username) {
                setFriendsNumber(prevNumber => prevNumber - 1)
            }
        })
        socket.on("acceptFriendRequest", (targetUserFromSocket: userType) => {
            if (targetUser.username === targetUserFromSocket.username) {
                console.log("Increment!")
                setFriendsNumber(prevNumber => prevNumber + 1)
            }
        })
        return () => {
            socket.off("acceptFriendRequest")
            socket.off("unfriendUser")
        }
    }, [targetUser.username])


    return (
        <div className="flex flex-col gap-14">
            <div className="flex flex-col items-center gap-10 relative">
                <h3 className="font-merryweather text-3xl">Bio</h3>
                {isCurrentUser && (
                    <div className="absolute right-20 bg-gradient-to-tl 
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
            <div className="flex justify-center gap-10">
                <p className="grid place-items-center gap-2">
                    <span className="font-bold text-2xl">
                        {friendsNumber}
                    </span>
                    <span className="opacity-80">Friends</span>
                </p>
                <p className="grid place-items-center gap-2">
                    <span className="font-bold text-2xl">
                        {targetUser.posts?.length}
                    </span>

                    <span className="opacity-80">Posts</span>
                </p>
            </div>
        </div>


    )
};

export default Bio;
