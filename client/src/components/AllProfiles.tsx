import "../assets/index.css";
import React from "react"

// Helper functions
import { usersAllProfiles } from "../helpers/fakerHelper";
import { ReactNode } from "react";

const AllProfiles = (): ReactNode => {

    return (
        <div className="my-20 flex flex-col gap-20 items-center overflow-auto">
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-4xl">All profiles</h2>
                <input type="text" />
            </div>
            <div className="flex flex-wrap gap-20 justify-center">
                {usersAllProfiles.map((profile, index) => (
                    <div className="profileWrapper" key={index}>
                        <img className="w-10" src={profile.avatar} alt="" />
                        <p>{profile.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AllProfiles;
