import React from "react"
import { TiCancel } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { deleteReceivedFriendRequest } from "../../api/friendRequestAPIs/deleteRecievedFriendRequestApi";
import { acceptFriendRequest } from "../../api/friendRequestAPIs/acceptFriendRequestApi";

const SingleFriendRequest: React.FC<{
    request: string
}> = ({ request }) => {

    const handleDeleteFriendRequest = async () => {
        try {
            await deleteReceivedFriendRequest(request)
        } catch (error) {
            console.log("Error occured while deleting friend request in header " + error)
        }
    }
    const handleAcceptFriendRequest = async () => {
        try {
            await acceptFriendRequest(request)
        } catch (error) {
            console.log("Error occured while accepting friend request in header " + error)
        }
    }
    return (

        <div className="grid items-center grid-cols-2 w-full">
            <span className="text-[1.2rem]">
                {request}
            </span>
            <div className="flex text-2xl gap-3">
                <span className="border-2 border-red-600 p-2 
                rounded-full cursor-pointer text-red-600 
                hover:bg-white hover:border-white"
                    onClick={handleDeleteFriendRequest} >
                    < TiCancel title="Decline request" />
                </span>
                <span className="border-2 border-green-600 
                p-2 rounded-full cursor-pointer text-green-600 
                hover:bg-white hover:border-white"
                    onClick={handleAcceptFriendRequest}>
                    < FaCheck title="Accept request" />
                </span>
            </div>

        </div>
    )
};

export default SingleFriendRequest;
