import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { getCurrentUser } from '../api/fetchUsersAPIs/getCurrentUserApi';
import { userType } from '../../../server/types/userType';


interface UserContextType {
    currentUserData: userType;
    setCurrentUserData: Dispatch<SetStateAction<userType>>;
    isCurrentUser: boolean;
    setIsCurrentUser: Dispatch<SetStateAction<boolean>>;
    targetUser: userType;
    setTargetUser: Dispatch<SetStateAction<userType>>
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
    const [targetUser, setTargetUser] = useState<userType>({
        age: 0,
        name: "",
        password: "",
        surname: "",
        username: ""
    })

    // Fetch currentUser
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
            setIsCurrentUser,
            targetUser,
            setTargetUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
