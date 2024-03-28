import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { getCurrentUser } from '../api/fetchUsersAPIs/getCurrentUserApi';
import { userType } from '../../../server/types/userType';
import { socket } from '../constants/SocketIoURL';

interface UserContextType {
    currentUserData: userType;
    setCurrentUserData: Dispatch<SetStateAction<userType>>;
}

// Context that will be used in components
export const UserContext = createContext<UserContextType>({} as UserContextType);

// UserProvider, for wrapping components that use UserContext
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [currentUserData, setCurrentUserData] = useState<userType>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: "",
        avatar: "",
        friends: [],
        posts: []
    });

    useEffect(() => {

        // Listen for socket events
        socket.on('acceptFriendRequest', (targetUser: userType) => {
            const updatedRequests = currentUserData.friendRequests?.filter(
                req => req !== targetUser.username
            )

            const updatedFriends = currentUserData.friends ? [...currentUserData.friends, targetUser.username] : []
            setCurrentUserData(prevData => ({
                ...prevData,
                friendRequests: updatedRequests,
                friends: updatedFriends
            }))
        });

        socket.on('deleteReceivedFriendRequest', (targetUser: userType) => {
            console.log("Delete received frienedRequest!!!!!")
            const updatedRequests = currentUserData.friendRequests?.filter(
                req => req !== targetUser.username
            )
            setCurrentUserData(prevData => ({
                ...prevData,
                friendRequests: updatedRequests
            }))
        });

        // Cleanup socket connection on component unmount
        return () => {
            socket.off("acceptFriendRequest");
            socket.off("deleteReceivedFriendRequest");
        };
    }, [currentUserData]);


    // Fetch currentUser when new user logs in
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser();
            setCurrentUserData(user);

        };
        fetchCurrentUser();

    }, [currentUserData._id]);


    return (
        <UserContext.Provider value={{
            currentUserData,
            setCurrentUserData
        }}>
            {children}
        </UserContext.Provider>
    );
};
