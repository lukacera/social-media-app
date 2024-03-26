import React, { Dispatch, SetStateAction } from "react"
import { TiCancel } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { handleAcceptFriendRequest, handleDeleteFriendRequest } from "../../handlers/HandleFriendRequest";

const SingleFriendRequest: React.FC<{
    request: string, index: number,
    setFriendRequests: Dispatch<SetStateAction<string[]>>
}> = ({ index, request, setFriendRequests }) => {
    return (
        <div className="flex items-center w-full justify-around">
            <span className="text-[1.2rem]">
                {request}
            </span>
            <p className="flex text-2xl gap-3">
                <span className="border-2 border-red-600 p-2 rounded-full cursor-pointer
                                        text-red-600 hover:bg-white hover:border-white"
                    onClick={() => handleDeleteFriendRequest(request, index, setFriendRequests)}>
                    < TiCancel title="Decline request" />
                </span>
                <span className="border-2 border-green-600 p-2 rounded-full cursor-pointer
                                        text-green-600 hover:bg-white hover:border-white"
                    onClick={() => handleAcceptFriendRequest(request, index, setFriendRequests)}>
                    < FaCheck title="Accept request" />
                </span>
            </p>

        </div>
    )
};

export default SingleFriendRequest;
