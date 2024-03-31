import React, { useContext, useEffect, useState } from "react"
import { IoMdPersonAdd } from "react-icons/io";
import { UserContext } from "../../hooks/UserContextHook";
import { socket } from "../../constants/SocketIoURL";
import { userType } from "../../../../server/types/userType";

import FriendRequestsDropdown from "./FriendRequestDropdown";

const DisplayFriendRequests: React.FC = () => {


    const { currentUserData } = useContext(UserContext)

    const [dropdown, setDropdown] = useState<boolean>(false)
    const [friendRequests, setFriendRequests] = useState<string[]>([])

    useEffect(() => {
        currentUserData.friendRequests && setFriendRequests(currentUserData.friendRequests)
    }, [currentUserData])

    useEffect(() => {

        socket.on('acceptFriendRequest', (targetUser: userType) => {
            const updatedRequests = currentUserData.friendRequests?.filter(
                req => req !== targetUser.username
            );
            setFriendRequests(updatedRequests || [])
        });

        socket.on('deleteReceivedFriendRequest', (targetUser: userType) => {

            const updatedRequests = currentUserData.friendRequests?.filter(
                req => req !== targetUser.username
            );
            setFriendRequests(updatedRequests || [])

        });

        return () => {
            socket.off("acceptFriendRequest");
            socket.off("deleteReceivedFriendRequest");
        };
    }, [currentUserData.friendRequests]);



    return (
        <section>
            {/* Icon and text paragraph */}
            <p className="flex gap-3 items-center cursor-pointer"
                onClick={() => setDropdown(!dropdown)}>
                {/* Icon */}
                <span className="text-4xl">
                    <IoMdPersonAdd />
                </span>
                {/* Text indicating the number of friend requests */}
                <span className="text-xl">{friendRequests.length}</span>
            </p>
            <div className="relative">
                {/* Absolute positioned div (dropdown menu) */}
                {dropdown && (
                    < FriendRequestsDropdown friendRequests={friendRequests} />
                )}
            </div>

        </section>
    );
};

export default DisplayFriendRequests