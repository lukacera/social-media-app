import { useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { deleteFriendRequest } from "../api/deleteFriendRequestApi";
import { sendFriendRequest } from '../api/sendFriendRequestApi';
import { userType } from '../../../server/types/userType';


const FriendStatus: React.FC<{ currentUser: userType, targetUser: userType }> = ({ currentUser, targetUser }) => {
    // Initialize state to check if currentUser and targetUser are friends
    const [isFriendRequestSent, setIsFriendRequestSent] = useState(
        targetUser.friendRequests?.includes(currentUser.username)
    );
    const areFriends = currentUser.friends?.includes(targetUser.username)
    console.log(isFriendRequestSent)
    const handleFriendRequest = async () => {
        if (isFriendRequestSent) {
            // Cancel friend request
            const data = await deleteFriendRequest(targetUser.username);
            console.log("Delete request!")
            console.log(data)
            setIsFriendRequestSent(false);
        } else {
            // Send friend request
            setIsFriendRequestSent(true);
            console.log("Send request!")
            const data = await sendFriendRequest(targetUser.username)
            console.log(data)
        }
    };

    return (
        <div className="flex justify-end w-full">
            <p className="bg-white px-2 text-black rounded-full text-2xl" onClick={handleFriendRequest}>
                {areFriends ? (
                    <FaUserFriends />
                ) : isFriendRequestSent ? (
                    <TiCancel />
                ) : (
                    <IoMdPersonAdd />
                )}
            </p>
        </div>
    );
};

export default FriendStatus;
