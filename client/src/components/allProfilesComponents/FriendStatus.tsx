import { useContext, useEffect, useState } from 'react';
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends, FaCheck } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { deleteSentFriendRequest } from "../../api/friendRequestAPIs/deleteSentFriendRequestApi";
import { sendFriendRequest } from '../../api/friendRequestAPIs/sendFriendRequestApi';
import { acceptFriendRequest } from '../../api/friendRequestAPIs/acceptFriendRequestApi';
import { userType } from '../../../../server/types/userType';
import { UserContext } from '../../hooks/UserContextHook';

const FriendStatus: React.FC<{ targetUser: userType }> = ({ targetUser }) => {
    const { currentUserData } = useContext(UserContext);

    // Initialize state to check if currentUser and targetUser are friends
    const [areFriends, setAreFriends] = useState<boolean>(false);
    const [friendRequestSent, setFriendRequestSent] = useState<boolean>(false);
    const [friendRequestReceived, setFriendRequestReceived] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {

        // Check if they are friends
        if (currentUserData.friends?.includes(targetUser.username) && targetUser.friends?.includes(currentUserData.username)) {
            setAreFriends(true);
            setFriendRequestSent(false)
            setFriendRequestReceived(false)
        }

        // If they are not friends
        else {
            if (targetUser.friendRequests && targetUser.friendRequests.includes(
                currentUserData.username)) {

                setFriendRequestSent(true)
                setAreFriends(false);
                setFriendRequestReceived(false);
            }

            else if (currentUserData.friendRequests && currentUserData.friendRequests.includes(
                targetUser.username)) {
                setFriendRequestReceived(true);

                setAreFriends(false);
                setFriendRequestSent(false);
            }

            else { // Neither user sent request to another, nor they are friends

                setFriendRequestReceived(false);
                setAreFriends(false);
                setFriendRequestSent(false);
            }
        }

    }, [currentUserData, targetUser]);

    // Function that will be called when user clicks on button
    const handleFriendRequest = async () => {
        setLoading(true); // Start loading

        try {

            if (areFriends) {
                // If they are already friends, delete the sent friend request
                await deleteSentFriendRequest(targetUser.username);
                setAreFriends(false);
                setFriendRequestSent(false);
                setFriendRequestReceived(false);
            }

            else if (friendRequestSent) {
                // If a friend request is sent, cancel it
                await deleteSentFriendRequest(targetUser.username);
                setFriendRequestSent(false);
            }

            else if (friendRequestReceived) {
                // If a friend request is received, accept it
                await acceptFriendRequest(targetUser.username);
                setAreFriends(true);
                setFriendRequestReceived(false);
            }

            else {
                // If no friend request is sent or received, send a friend request
                await sendFriendRequest(targetUser.username);
                setFriendRequestSent(true);
            }
        } catch (error) {
            console.error("Error occurred while handling friend request: ", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-end w-full">
            <button
                className="bg-white px-2 text-black rounded-full text-2xl"
                onClick={handleFriendRequest}
                disabled={loading}>
                {areFriends ? (
                    <FaUserFriends />
                ) : friendRequestSent ? (
                    <TiCancel />
                ) : friendRequestReceived ? (
                    <FaCheck />
                ) : (
                    <IoMdPersonAdd />
                )}
            </button>
        </div>
    );
};

export default FriendStatus;
