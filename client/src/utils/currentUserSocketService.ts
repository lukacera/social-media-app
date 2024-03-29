import { Dispatch, SetStateAction } from "react";
import { userType } from "../../../server/types/userType";
import { socket } from "../constants/SocketIoURL";
import { postType } from "../../../server/types/postType";

export const setupSocketListeners = (
    setCurrentUserData: Dispatch<SetStateAction<userType>>,
    currentUserData: userType) => {

    socket.on('acceptFriendRequest', (targetUser: userType) => {
        const updatedRequests = currentUserData.friendRequests?.filter(
            req => req !== targetUser.username
        );
        const updatedFriends = currentUserData.friends ? [...currentUserData.friends, targetUser.username] : [];
        setCurrentUserData(prevData => ({
            ...prevData,
            friendRequests: updatedRequests,
            friends: updatedFriends
        }));

        console.log("Friend request accepted!!")
    });

    socket.on('deleteReceivedFriendRequest', (targetUser: userType) => {

        const updatedRequests = currentUserData.friendRequests?.filter(
            req => req !== targetUser.username
        );
        console.log("Delete request!")
        console.log(updatedRequests)
        setCurrentUserData(prevData => ({
            ...prevData,
            friendRequests: updatedRequests
        }));
    });

    socket.on('unfriendUser', (targetUser) => {
        console.log("Unfriend user!")
        const updatedFriends = currentUserData.friends?.filter(
            friend => friend !== targetUser.username
        );
        setCurrentUserData(prevData => ({
            ...prevData,
            friends: updatedFriends
        }));
    });

    socket.on("newPost", (post: postType) => {

        const updatedPosts = currentUserData.posts ? [...currentUserData.posts, post] : [];
        // Update the currentUserData state with the new array
        setCurrentUserData(prevData => ({
            ...prevData,
            posts: updatedPosts
        }));
    })
};

export const removeSocketListeners = () => {
    socket.off("acceptFriendRequest");
    socket.off("deleteReceivedFriendRequest");
    socket.off("unfriendUser");
};