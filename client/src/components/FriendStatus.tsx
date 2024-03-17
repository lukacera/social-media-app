import { useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { deleteFriendRequest } from "../api/deleteFriendRequestApi";
import { userType } from '../../../server/types/userType';


const FriendStatus: React.FC<{ currentUser: userType, targetUser: userType }> = ({ currentUser, targetUser }) => {

    // Initialize state to check if currentUser and targetUser are friends
    const [isFriendRequestSent, setIsFriendRequestSent] = useState(
        targetUser.friendRequests?.includes(currentUser.username)
    );
    const [areFriends, setAreFriends] = useState(
        targetUser.friends?.includes(currentUser.username)
    );

    const handleFriendRequest = async () => {
        if (isFriendRequestSent) {
            // Cancel friend request
            console.log(targetUser.username)
            const data = await deleteFriendRequest(targetUser.username);
            console.log(data)
            setIsFriendRequestSent(false);
        } else {
            // Send friend request
            setIsFriendRequestSent(true);
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
