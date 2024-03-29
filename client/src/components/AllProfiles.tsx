import "../assets/index.css";
import { Key, useContext, useEffect, useState } from "react";
import { getAllProfiles } from "../api/fetchUsersAPIs/getAllProfilesApi";
import { userType } from "../../../server/types/userType";
import { UserContext } from "../hooks/UserContextHook";
import AllProfilesSearchBarInput from "./allProfilesComponents/AllProfilesSearchBarInput";
import Profile from "./allProfilesComponents/Profile";
import LoadingFidget from "./UIComponents/LoadingFidget";

const AllProfiles: React.FC = () => {

    const { currentUserData } = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<userType[]>([]);
    const [searchProfile, setSearchProfile] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = (await getAllProfiles()).filter(user => (
                    user.username !== currentUserData.username
                ));
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error occurred while fetching all profiles from DB: ", error);
                setLoading(false);
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
            {loading
                ? <LoadingFidget />
                : (
                    <div className="my-20 flex flex-col gap-32 items-center overflow-auto">
                        <AllProfilesSearchBarInput setSearchProfile={setSearchProfile} />
                        <div className="flex flex-wrap gap-20 justify-center">

                            {filteredUsers.length === 0 &&
                                <p className="text-2xl">
                                    No profiles found!
                                </p>}
                            {filteredUsers.map((user: userType) => (
                                <div key={user._id as unknown as Key}>
                                    <Profile user={user} />
                                </div>

                            ))}

                        </div>
                    </div>
                )}

        </div>

    )
};

export default AllProfiles;
