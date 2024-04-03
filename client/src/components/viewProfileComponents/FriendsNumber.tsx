import React, { useState, useEffect } from "react"
import { userType } from "../../../../server/types/userType";
import { socket } from "../../constants/SocketIoURL";
const FriendsNumber: React.FC<{ targetUser: userType }> = ({ targetUser }) => {
    const [friendsNumber, setFriendsNumber] = useState<number>(0)

    useEffect(() => {
        targetUser.friends && setFriendsNumber(targetUser.friends?.length)
    }, [targetUser])

    useEffect(() => {
        socket.on("unfriendUser", () => {
            setFriendsNumber(prevNumber => prevNumber - 1)

        })
        socket.on("acceptFriendRequest", () => {
            setFriendsNumber(prevNumber => prevNumber + 1)

        })
        return () => {
            socket.off("acceptFriendRequest")
            socket.off("unfriendUser")
        }
    }, [])
    return (
        <p className="grid place-items-center gap-2">
            <span className="font-bold text-2xl">
                {friendsNumber}
            </span>
            <span className="opacity-80">Friends</span>
        </p>
    )
};

export default FriendsNumber;
