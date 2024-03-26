import React, { useContext } from "react"
import FriendStatus from "./FriendStatus";
import { getImgURL } from "../../constants/imgURL";
import { Link } from "react-router-dom";
import { userType } from "../../../../server/types/userType";
import { UserContext } from "../../hooks/UserContextHook";

const Profile: React.FC<{ user: userType }> = ({ user }) => {
    const { currentUserData } = useContext(UserContext)

    return (
        <>
            {currentUserData.username !== user.username && (
                <div className="profileWrapper" >
                    <Link to={`/users/${user.username}`}>
                        <div className="flex place-items-center">
                            <img className="w-[3rem] h-[3rem] rounded-full"
                                src={getImgURL(user.avatar || "")} alt="" />
                            <p className="pl-10 text-[1.2rem]">{user.username}</p>
                        </div>
                    </Link>
                    <FriendStatus targetUser={user} />
                </div>
            )}
        </>

    )
};

export default Profile;
