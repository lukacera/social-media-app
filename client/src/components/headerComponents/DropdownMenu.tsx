import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContextHook";
import gsap from "gsap";

const DropdownMenu: React.FC<{
    setShowDropdown: Dispatch<SetStateAction<boolean>>,
    showDropdown: boolean
}> = ({ setShowDropdown }) => {

    const dropdownRef = useRef(null)
    const { currentUserData } = useContext(UserContext);

    useEffect(() => {
        gsap.fromTo(
            dropdownRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }
        );
    }, []);


    return (
        <div className="absolute top-16 
        -right-10 bg-profileColor pl-10 pr-7 py-5
        rounded-lg
        xl:top-[4.3rem] xl:right-0
        xl:w-[20rem]"
            ref={dropdownRef}>
            <div className="grid place-items-center gap-5">
                <Link to={`/users/${currentUserData.username}`}
                    className="text-center p-2 bg-white text-black 
                    rounded-lg xl:w-[7rem]"
                    onClick={() => setShowDropdown(false)}>
                    Edit Profile
                </Link>
                <Link to="/" className="p-2 bg-white text-black 
                rounded-lg xl:w-[7rem] text-center"
                    onClick={() => localStorage.removeItem("token")
                    }>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default DropdownMenu;
