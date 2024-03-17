import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../api/getCurrentUserApi";
import { IoMdPersonAdd } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

const DisplayFriendRequests: React.FC = () => {
    const [friendRequests, setFriendRequests] = useState<string[]>([])
    const [dropdown, setDropdown] = useState<boolean>(false)
    // Fetch friendRequests for user that is currently logged in
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData.friendRequests) {
                    setFriendRequests(userData.friendRequests)
                }
            } catch (error) {
                console.log("Error occured while fetching user's friend requests")
            }

        }

        fetchData()
    }, [])

    return (
        <section>
            <div className="relative">
                <p className="flex gap-3 items-center cursor-pointer"
                    onClick={() => setDropdown(!dropdown)}>
                    <span className="text-4xl">
                        < IoMdPersonAdd />
                    </span>
                    <span className="text-xl">{friendRequests.length}</span>
                </p>
                {dropdown && (
                    <ul className="absolute -left-24 top-10 px-7 py-5 bg-profileColor
                                    border-2 border-borderGray z-10">
                        {friendRequests.map((request, index) => (
                            <li key={index} className="flex gap-5 items-center">
                                <span className="text-[1.2rem]">
                                    {request}
                                </span>
                                <div className="flex text-2xl gap-3">
                                    <span className="border-2 p-2 rounded-full cursor-pointer
                                    hover:bg-white hover:text-black">
                                        < TiCancel />
                                    </span>
                                    <span className="border-2 p-2 rounded-full cursor-pointer
                                    hover:bg-white hover:text-black">
                                        < FaCheck />
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                )}
            </div>
        </section>
    );
};

export default DisplayFriendRequests