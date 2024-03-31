import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContextHook";

const DropdownMenu = () => {
    const { currentUserData } = useContext(UserContext);

    return (
        <div className="absolute -right-10">
            <div className="bg-profileColor border-1 border-borderGray 
            rounded-sm py-5 px-2">
                <Link to={`/users/${currentUserData.username}`} className="block text-center text-white hover:text-gray-200 py-2">
                    Edit Profile
                </Link>
                <Link to="/" className="block text-center text-white hover:text-gray-200 py-2" onClick={() => localStorage.removeItem("token")}>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default DropdownMenu;
