import "../assets/index.css";
import { IoMdPersonAdd } from "react-icons/io";



import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { userType } from "../../../server/types/userType";
import { getAllProfiles } from "../api/getAllProfilesApi";

const AllProfiles = (): ReactNode => {
    const [users, setUsers] = useState<userType[]>([])
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllProfiles()
            setUsers(data.users)

        }

        fetchUsers()
    }, [])
    const [searchProfile, setSearchProfile] = useState<string>('')
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        setSearchProfile(searchValue)
    }


    let filteredUsers: userType[];
    if (users.length > 0) {
        filteredUsers = users.filter(user => {
            return user.username.toLowerCase().includes(searchProfile.toLowerCase())
        })
    } else {
        filteredUsers = []
    }

    return (
        <div className="my-20 flex flex-col gap-32 items-center overflow-auto">
            <div className="flex flex-col items-center gap-7">
                <h2 data-testid="allProfiles-header"
                    className="text-4xl">All profiles</h2>
                <input onChange={handleInputChange}
                    className="px-5 py-3 w-[30rem] text-black 
                    focus:outline-none rounded-full"
                    type="text" placeholder="Search for profiles" />
            </div>
            <div className="flex flex-wrap gap-20 justify-center">

                {users.length === 0 &&
                    <p className="text-2xl">No profiles found!</p>
                }
                {filteredUsers && filteredUsers.map((user: userType, index: number) => (
                    <div className="profileWrapper" key={index}>
                        <img className="w-10 rounded-full" src={user.avatar} alt="" />
                        <p>{user.username}</p>
                        <p className="flex justify-end w-full">
                            <span className="bg-white px-2 text-black rounded-full
                            text-2xl">
                                < IoMdPersonAdd />
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AllProfiles;
