import { SetStateAction, Dispatch } from "react";
import { acceptFriendRequest } from "../api/friendRequestAPIs/acceptFriendRequestApi";
import { deleteReceivedFriendRequest } from "../api/friendRequestAPIs/deleteRecievedFriendRequestApi";

export const handleAcceptFriendRequest = async (request: string,
    index: number, setFriendRequests: Dispatch<SetStateAction<string[]>>) => {
    try {
        await acceptFriendRequest(request)
        setFriendRequests((prevRequests: string[]) => {
            const updatedRequests = [...prevRequests];
            updatedRequests.splice(index, 1)
            return updatedRequests
        })
    } catch (error) {
        console.log("Error occured while accepting friend request: " + error)
    }
}
export const handleDeleteFriendRequest = async (request: string, index: number,
    setFriendRequests: Dispatch<SetStateAction<string[]>>) => {
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