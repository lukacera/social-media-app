import React from "react";
import { Link } from "react-router-dom";
import { userType } from "../../../../server/types/userType";
import FriendStatus from "./FriendStatus";
import { getImgURL } from "../../constants/imgURL";

const Profile: React.FC<{ user: userType }> = ({ user }) => {

    return (
        <div className="profileWrapper">
            <Link to={`/users/${user.username}`}>
                <div className="flex place-items-center">
                    <img className="w-[3rem] h-[3rem] rounded-full" src={getImgURL(user.avatar || "")} alt="" />
                    <p className="pl-10 text-[1.2rem]">{user.username}</p>
                </div>
            </Link>
            <FriendStatus targetUser={user} />
        </div>
    );
};

export default Profile;
