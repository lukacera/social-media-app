import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { getCurrentUser } from '../api/fetchUsersAPIs/getCurrentUserApi';
import { userType } from '../../../server/types/userType';


interface UserContextType {
    currentUserData: userType;
    setCurrentUserData: Dispatch<SetStateAction<userType>>;
    isCurrentUser: boolean;
    setIsCurrentUser: Dispatch<SetStateAction<boolean>>;
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

    // Fetch currentUser when he changes, new user logs in
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await getCurrentUser();
            setCurrentUserData(user);

        };
        fetchCurrentUser();

    }, [currentUserData._id]);



    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{
            currentUserData,
            setCurrentUserData,
            isCurrentUser,
            setIsCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
