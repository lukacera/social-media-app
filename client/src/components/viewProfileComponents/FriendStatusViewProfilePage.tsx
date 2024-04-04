import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../hooks/UserContextHook";
import { sendFriendRequest } from "../../api/friendRequestAPIs/sendFriendRequestApi";
import { deleteSentFriendRequest } from "../../api/friendRequestAPIs/deleteSentFriendRequestApi";
import { deleteReceivedFriendRequest } from "../../api/friendRequestAPIs/deleteRecievedFriendRequestApi";
import { socket } from "../../constants/SocketIoURL";
import { acceptFriendRequest } from "../../api/friendRequestAPIs/acceptFriendRequestApi";
import { unfriendUser } from "../../api/friendRequestAPIs/unfriendApi";
import { userType } from "../../../../server/types/userType";

const FriendStatusViewProfilePage: React.FC<{ targetUser: userType }> = ({ targetUser }) => {


  const { currentUserData } = useContext(UserContext);

  const [areFriends, setAreFriends] = useState<boolean>(false);
  const [friendRequestSent, setFriendRequestSent] = useState<boolean>(false);
  const [friendRequestReceived, setFriendRequestReceived] = useState<boolean>(false);

  useEffect(() => {
    // Set initial state for areFriends
    targetUser.friends && currentUserData.friends && setAreFriends(targetUser.friends.includes(currentUserData.username)
      && currentUserData.friends?.includes(targetUser.username));

    // Set initial state for friendRequestSent
    targetUser.friendRequests && setFriendRequestSent(targetUser.friendRequests.includes(currentUserData.username));

    // Set initial state for friendRequestReceived
    currentUserData.friendRequests && setFriendRequestReceived(currentUserData.friendRequests.includes(targetUser.username));

  }, [targetUser, currentUserData]);



  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    socket.on("friendRequestSent", () => {
      setFriendRequestSent(true);
      setAreFriends(false);
      setFriendRequestReceived(false);
    });

    socket.on("deleteSentFriendRequest", () => {
      setFriendRequestSent(false);
    });

    socket.on("unfriendUser", () => {
      setAreFriends(false);
      setFriendRequestSent(false);
      setFriendRequestReceived(false);
    });

    socket.on("deleteReceivedFriendRequest", () => {
      setFriendRequestReceived(false);
    });

    return () => {
      socket.off("friendRequestSent");
      socket.off("acceptFriendRequest");
      socket.off("unfriendUser");
      socket.off("deleteSentFriendRequest");
      socket.off("deleteReceivedFriendRequest");
    };
  }, []);

  const handleUnfriend = async () => {
    setLoading(true);
    try {
      await unfriendUser(targetUser.username);
    } catch (error) {
      console.error("Error unfriending user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSentRequest = async () => {
    setLoading(true);
    try {
      await deleteSentFriendRequest(targetUser.username);

    } catch (error) {
      console.error("Error cancelling sent friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      await acceptFriendRequest(targetUser.username);

    } catch (error) {
      console.error("Error accepting friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReceivedRequest = async () => {
    setLoading(true);
    try {
      await deleteReceivedFriendRequest(targetUser.username);

    } catch (error) {
      console.error("Error deleting received friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      await sendFriendRequest(targetUser.username);

    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center">
      <>
        {areFriends ? (
          <button disabled={loading}
            onClick={handleUnfriend}
            className="px-8 py-3 bg-red-600 rounded-lg">
            Unfriend {targetUser.username}
          </button>

        ) : friendRequestSent ? (
          <button disabled={loading}
            onClick={handleCancelSentRequest}
            className="px-8 py-3 bg-red-600 rounded-lg">
            Cancel sent friend request for {targetUser.username}
          </button>

        ) : friendRequestReceived ? (
          <div className="flex gap-4">
            <button disabled={loading}
              onClick={handleAcceptRequest}
              className="px-8 py-3 bg-blue-600 rounded-lg">
              Accept request from {targetUser.username}
            </button>
            <button disabled={loading}
              onClick={handleDeleteReceivedRequest}
              className="px-8 py-3 bg-red-600 rounded-lg">
              Delete request from {targetUser.username}
            </button>
          </div>

        ) : (
          <button disabled={loading}
            onClick={handleSendRequest}
            className="px-8 py-3 bg-blue-600 rounded-lg">
            Send friend request to {targetUser.username}
          </button>
        )}
      </>
    </div>
  );
};

export default FriendStatusViewProfilePage;
