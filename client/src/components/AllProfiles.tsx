import "../assets/index.css";

import { useContext, useEffect, useState } from "react";
import { getAllProfiles } from "../api/fetchUsersAPIs/getAllProfilesApi";
import { userType } from "../../../server/types/userType";

import { UserContext } from "../hooks/UserContextHook";
import AllProfilesSearchBarInput from "./allProfilesComponents/AllProfilesSearchBarInput";
import Profile from "./allProfilesComponents/Profile";

const AllProfiles: React.FC = () => {

    const { currentUserData } = useContext(UserContext)

    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<userType[]>([])
    const [searchProfile, setSearchProfile] = useState<string>('')

    // Fetch all profiles on first render, and set loading to false
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = (await getAllProfiles()).filter(user => (
                    user.username !== currentUserData.username
                ))

                setUsers(data)
                setLoading(false)

            }
            catch (error) {
                console.error("Error occured while fetching all profiles from DB: " + error)
            }
        }
        fetchUsers()

    }, [currentUserData.username])


    // Use filteredUsers array to display users
    const filteredUsers: userType[] = users.filter(user =>
        user.username.toLowerCase().includes(searchProfile.toLowerCase())
    );

    return (
        <div>
            {!loading && (
                <div className="my-20 flex flex-col gap-32 items-center overflow-auto">
                    <AllProfilesSearchBarInput setSearchProfile={setSearchProfile} />
                    <div className="flex flex-wrap gap-20 justify-center">

                        {filteredUsers.length === 0 &&
                            <p className="text-2xl">No profiles found!</p>
                        }

                        {/* Display filteredUser (all but currentUser) */}
                        {filteredUsers && filteredUsers.map((user: userType, index: number) => (

                            <div key={index}>
                                < Profile user={user} />
                            </div>

                        ))}

                    </div>
                </div>
            )}

        </div>

    )
};

export default AllProfiles;
