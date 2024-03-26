import { useContext } from "react"
import { getImgURL } from "../../constants/imgURL";
import { UserContext } from "../../hooks/UserContextHook";
import { Link } from "react-router-dom";
const CurrentUserProfileWrapper = () => {

    const { currentUserData } = useContext(UserContext)

    return (
        <div className="dropdown grid place-items-center">
            <div className="profileWrapper">
                <img className="w-12 h-12 rounded-full"
                    src={getImgURL(currentUserData.avatar || "")} alt="" />
                <p className="profileName">{currentUserData.username}</p>
            </div>
            <div className="menu h-[10rem] w-[20rem] rounded-lg 
                    bg-profileColor border-[1px] border-borderGray
                    absolute top-28 hidden place-items-center">
                <div className="flex gap-5">
                    <Link to={`/users/${currentUserData.username}`}>
                        <p className="dropdownButton">
                            Edit profile
                        </p>
                    </Link>
                    {/* Remove token from localStorage when user logout & 
                            redirect to login page */}
                    <Link to={"/"} onClick={() => localStorage.removeItem("token")}>
                        <p className="dropdownButton">
                            Logout
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default CurrentUserProfileWrapper;
