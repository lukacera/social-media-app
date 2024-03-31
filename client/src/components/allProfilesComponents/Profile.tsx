import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userType } from "../../../../server/types/userType";
import FriendStatus from "./FriendStatus";
import { getImgURL } from "../../constants/imgURL";
import { getUser } from "../../api/fetchUsersAPIs/getUserApi";
import { socket } from "../../constants/SocketIoURL";

const Profile: React.FC<{ user: userType }> = ({ user }) => {

    const [updatedUser, setUpdatedUser] = useState<userType | null>(null);

    useEffect(() => {

        const fetchUpdatedUser = async (username: string) => {
            try {
                const updatedUserData: userType = await getUser(username);
                setUpdatedUser(updatedUserData);
            } catch (error) {
                console.error("Error fetching updated user data:", error);
            }
        };

        // Listen to acceptFriendRequest event
        socket.on("acceptFriendRequest", (acceptedUser: userType) => {
            if (acceptedUser.username === user.username) {
                // Fetch updated user data
                fetchUpdatedUser(acceptedUser.username);
            }
        });

        return () => {
            // Clean up event listener
            socket.off("acceptFriendRequest");
        };
    }, [user.username]);

    return (
        <div>
            <div className="bg-profileColor rounded-full border-[1px]
            border-gray-600 flex items-center gap-5 overflow-hidden 
            cursor-pointer px-6 py-2 w-[18rem]">
                <Link to={`/users/${user.username}`}>
                    <div className="flex place-items-center">
                        <img className=" w-[3rem] h-[3rem] rounded-full"
                            src={getImgURL(user.avatar || "")} alt="" />
                        <p className="pl-8 text-[1.2rem] max-w-[9rem] 
                        break-words">
                            {updatedUser ? updatedUser.username : user.username}
                        </p>
                    </div>
                </Link>
                <FriendStatus targetUser={updatedUser || user} />
            </div>
        </div>
    );
};

export default Profile;
