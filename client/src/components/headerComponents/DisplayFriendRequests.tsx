import React, { useContext, useEffect, useState } from "react"
import { IoMdPersonAdd } from "react-icons/io";
import SingleFriendRequest from "./SingleFriendRequest";
import { UserContext } from "../../hooks/UserContextHook";
import { socket } from "../../constants/SocketIoURL";
import { userType } from "../../../../server/types/userType";
const DisplayFriendRequests: React.FC = () => {

    const { currentUserData } = useContext(UserContext)
    const [friendRequests, setFriendRequests] = useState<string[]>(
        currentUserData.friendRequests || []
    )
    const [dropdown, setDropdown] = useState<boolean>(false)

    useEffect(() => {
        console.log("Socket connection is live!");

        const handleAcceptFriendRequest = (targetUser: userType) => {
            console.log("Accept received friend request!");
            setFriendRequests(prevReq => {
                const updatedRequests = prevReq.filter(req => req !== targetUser.username);
                return updatedRequests;
            });
        };

        const handleDeleteReceivedFriendRequest = (username: string) => {
            console.log("Delete received friend request!");
            setFriendRequests(prevReq => {
                const updatedRequests = prevReq.filter(req => req !== username);
                return updatedRequests;
            });
        };

        socket.on("acceptFriendRequest", handleAcceptFriendRequest);
        socket.on("deleteReceivedFriendRequest", handleDeleteReceivedFriendRequest);

        return () => {
            socket.off("acceptFriendRequest", handleAcceptFriendRequest);
            socket.off("deleteReceivedFriendRequest", handleDeleteReceivedFriendRequest);
            console.log("Socket connection is turned off!");
        };
    }, []);

    useEffect(() => {
        console.log("Current user's friend requests changed")
        console.log(currentUserData.friendRequests)
        if (currentUserData.friendRequests) {
            setFriendRequests(currentUserData.friendRequests)
        } else {
            setFriendRequests([])

        }
    }, [currentUserData])


    return (
        <section>
            <div className="relative">
                <p className="flex gap-3 items-center cursor-pointer"
                    onClick={() => setDropdown(!dropdown)}>
                    <span className="text-4xl z-0">
                        < IoMdPersonAdd />
                    </span>
                    <span className="text-xl">{friendRequests.length}</span>
                </p>
                {dropdown && (
                    <div className="absolute -left-24 top-14 px-7 py-5 bg-profileColor
                    border-2 border-borderGray z-10">
                        {friendRequests.length > 0 && (
                            <h3 className="text-lg text-nowrap">
                                You have
                                <span className="font-bold px-1">
                                    {friendRequests.length}
                                </span>
                                pending
                                <span className="px-1">
                                    {friendRequests.length === 1 ? "request" : "requests"}
                                </span>

                            </h3>
                        )}
                        {friendRequests.length === 0 && (
                            <span className="text-lg text-nowrap">
                                You have no pending friend requests!
                            </span>
                        )}
                        <ul className="pt-8 grid place-items-center gap-5">
                            {friendRequests.map((request, index) => (
                                <li key={index} className="flex gap-5 items-center w-full">
                                    < SingleFriendRequest request={request} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DisplayFriendRequests