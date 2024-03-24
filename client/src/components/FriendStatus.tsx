import { useContext, useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { deleteSentFriendRequest } from "../api/friendRequestAPIs/deleteSentFriendRequestApi";
import { sendFriendRequest } from '../api/friendRequestAPIs/sendFriendRequestApi';
import { userType } from '../../../server/types/userType';
import { UserContext } from '../hooks/UserContextHook';

const FriendStatus: React.FC<{ targetUser: userType }> = ({ targetUser }) => {
    const { currentUserData } = useContext(UserContext)
    // Initialize state to check if currentUser and targetUser are friends
    const [isFriendRequestSent, setIsFriendRequestSent] = useState(
        targetUser.friendRequests?.includes(currentUserData.username)
    );

    // Initialize useEffect hook to set friend request status for each user on each render
    useEffect(() => {
        setIsFriendRequestSent(
            targetUser.friendRequests?.includes(currentUserData.username)
        )
    }, [targetUser, currentUserData.username])

    // Check if users are friends already
    const areFriends = currentUserData.friends?.includes(targetUser.username)

    const handleFriendRequest = async () => {
        if (isFriendRequestSent) {
            // Cancel friend request
            await deleteSentFriendRequest(targetUser.username);

            setIsFriendRequestSent(false);
        } else {
            // Send friend request
            setIsFriendRequestSent(true);
            await sendFriendRequest(targetUser.username)
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
