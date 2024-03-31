import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx";
import { gsap } from "gsap"
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContextHook";
const SidebarDropdownMenu: React.FC<{
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsDropdownOpen }) => {

    const { currentUserData } = useContext(UserContext)

    const navRef = useRef(null)
    const xRef = useRef(null)
    const ulRef = useRef(null)

    // Animation when navbar is open
    useEffect(() => {
        gsap.fromTo(navRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "circ",
            x: "-100%"
        },
            {
                opacity: 1,
                x: "0"
            }
        )

        gsap.fromTo(ulRef.current, {
            duration: 3,
            ease: "circ.in",
            y: "-100%"
        }, {
            y: "0"
        })
    }, [])

    const handleCloseDropdown = () => {
        gsap.to(navRef.current, {
            opacity: 0,
            x: "100%",
            duration: 0.5,
            onComplete: () => setIsDropdownOpen(false),
        });

    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-backgroundDark"
            ref={navRef}>

            <div ref={xRef} className="absolute top-5 right-5 text-[2rem] cursor-pointer
            hover:text-borderGray"
                onClick={() => handleCloseDropdown()}>
                <RxCross2 />
            </div>


            <div className="flex justify-center items-start gap-10 mt-40">

                {/* 1st ul */}
                <ul className="grid place-items-center
                font-merryweather gap-10" ref={ulRef}>
                    <li className="px-5 py-3 bg-borderGray
                    rounded-lg flex justify-center"
                        onClick={handleCloseDropdown}>
                        <Link to={"/home"}>
                            Feed
                        </Link>
                    </li>
                    <li className="px-5 py-3 bg-borderGray rounded-lg
                    flex justify-center" onClick={handleCloseDropdown}>
                        <Link to={"/users"}>
                            All profiles
                        </Link>
                    </li>
                    <li onClick={handleCloseDropdown}>
                        <Link to={`/users/${currentUserData.username}`}>

                            <div className="px-5 py-3 bg-borderGray
                            rounded-lg flex justify-center">
                                Edit profile
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => localStorage.removeItem("token")}>
                        <Link to={"/"}>
                            <div className="text-red-600 mt-10 text-xl tracking-wide">
                                Logout
                            </div>
                        </Link>
                    </li>
                </ul>

                {/* 2nd ul */}
                <ul className="flex flex-col gap-12
                font-merryweather mt-12">
                    <li className="px-5 py-3 bg-blue-500"
                        onClick={handleCloseDropdown}>
                        Create new post
                    </li>
                    <li className="px-5 py-3 bg-blue-500"
                        onClick={handleCloseDropdown}>
                        Friend requests
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default SidebarDropdownMenu;
