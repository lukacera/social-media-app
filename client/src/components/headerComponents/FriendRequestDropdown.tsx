import React, { useRef, useEffect } from "react"
import gsap from "gsap";
import SingleFriendRequest from "./SingleFriendRequest";


const FriendRequestsDropdown: React.FC<{
    friendRequests: string[]
}> = ({ friendRequests }) => {


    const dropdownRef = useRef(null)


    // Animate on opening of dropdown
    useEffect(() => {
        gsap.fromTo(dropdownRef.current, {
            y: "-20%",
            opacity: 0,
            duration: 0.3,
            ease: "elastic.in"
        }, {
            y: "0",
            opacity: 1
        })

    }, [])


    return (
        <div className="absolute -left-32 
                    top-5 px-7 py-5 bg-profileColor border-2 
                    border-borderGray text-center
                    w-[20rem] z-10"
            ref={dropdownRef}>
            {/* Dropdown menu content */}
            {friendRequests.length > 0 && (
                <h3 className="text-lg">
                    You have
                    <span className="font-bold px-1">
                        {friendRequests.length}
                    </span>
                    pending
                    <span className="px-1">
                        {friendRequests.length === 1 ? "request" : "requests"}
                    </span>
                </h3>
            )}
            {friendRequests.length === 0 && (
                <span className="text-lg">
                    You have no pending friend requests!
                </span>
            )}
            <ul className="pt-8 grid place-items-center gap-5">
                {/* Map through friend requests and render SingleFriendRequest component */}
                {friendRequests.map((request, index) => (
                    <li key={index} className="flex gap-5 items-center w-full">
                        <SingleFriendRequest request={request} />
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default FriendRequestsDropdown;
