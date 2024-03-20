import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../api/fetchUsersAPIs/getCurrentUserApi";
import { IoMdPersonAdd } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { acceptFriendRequest } from "../api/friendRequestAPIs/acceptFriendRequestApi";
import { deleteReceivedFriendRequest } from "../api/friendRequestAPIs/deleteRecievedFriendRequestApi";

const DisplayFriendRequests: React.FC = () => {

    const [friendRequests, setFriendRequests] = useState<string[]>([])
    const [dropdown, setDropdown] = useState<boolean>(false)

    // Fetch friendRequests for user that is currently logged in
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData.friendRequests) {
                    setFriendRequests(userData.friendRequests)
                }
            } catch (error) {
                console.log("Error occured while fetching user's friend requests")
            }

        }

        fetchData()
    }, [])

    const handleAcceptFriendRequest = async (request: string, index: number) => {
        try {
            await acceptFriendRequest(request)
            setFriendRequests((prevRequests) => {
                const updatedRequests = [...prevRequests];
                updatedRequests.splice(index, 1)
                return updatedRequests
            })
        } catch (error) {
            console.log("Error occured while accepting friend request: " + error)
        }
    }
    const handleDeleteFriendRequest = async (request: string, index: number) => {
        try {
            await deleteReceivedFriendRequest(request)
            setFriendRequests((prevRequests) => {
                const updatedRequests = [...prevRequests];
                updatedRequests.splice(index, 1)
                return updatedRequests
            })
        } catch (error) {
            console.log("Error occured while deleting friend request: " + error)
        }
    }
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
                        <ul className="pt-8">
                            {friendRequests.map((request, index) => (
                                <li key={index} className="flex gap-5 items-center">
                                    <span className="text-[1.2rem]">
                                        {request}
                                    </span>
                                    <p className="flex text-2xl gap-3">
                                        <span className="border-2 border-red-600 p-2 rounded-full cursor-pointer
                                        text-red-600 hover:bg-white hover:border-white"
                                            onClick={() => handleDeleteFriendRequest(request, index)}>
                                            < TiCancel title="Decline request" />
                                        </span>
                                        <span className="border-2 border-green-600 p-2 rounded-full cursor-pointer
                                        text-green-600 hover:bg-white hover:border-white"
                                            onClick={() => handleAcceptFriendRequest(request, index)}>
                                            < FaCheck title="Accept request" />
                                        </span>
                                    </p>
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