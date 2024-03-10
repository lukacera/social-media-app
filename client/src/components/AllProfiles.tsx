import "../assets/index.css";
import { IoMdPersonAdd } from "react-icons/io";

// Helper functions
import { usersAllProfiles, User } from "../helpers/fakerHelper";

import { ChangeEvent, ReactNode, useEffect, useState } from "react";

const AllProfiles = (): ReactNode => {

    const [searchProfile, setSearchProfile] = useState('')
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        setSearchProfile(searchValue)
    }
    // Compare search to existing profiles
    const usersAllProfilesFilter: User[] = usersAllProfiles.filter(profile => (
        profile.username.toLowerCase().includes(searchProfile.toLowerCase())
    ))
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

                {usersAllProfilesFilter.length === 0 &&
                    <p className="text-2xl">No profiles found!</p>
                }
                {usersAllProfilesFilter.map((profile, index) => (
                    <div className="profileWrapper" key={index}>
                        <img className="w-10 rounded-full" src={profile.avatar} alt="" />
                        <p>{profile.username}</p>
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
