import React from "react"
import { userType } from "../../../server/types/userType";

// Get userData as prop from mainPage
const ViewProfile: React.FC<{ userData: userType }> = ({ userData }) => {
  return (

    <div className="h-full grid justify-center">
      {userData.username != "" && (
        <div className="flex flex-col gap-16 text-xl mt-16">
          <div className="flex flex-col place-items-center gap-10 
            w-[70%] mx-auto">
            <img className="w-[15rem]" src={userData.avatar} alt="User picture" />
            <h2 className="text-[2.4rem] font-bold">{userData.username}</h2>
          </div>
          <div className="flex flex-col items-center gap-10">
            <h3 className="font-merryweather text-3xl">Bio</h3>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <p className="flex items-center gap-1">
                  <span>Name:</span>
                  <span>{userData.name}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>Surname:</span>
                  <span>{userData.surname}</span>
                </p>
              </div>
              <p className="flex justify-center gap-2">
                <span>Age:</span>
                <span>{userData.age}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <p className="flex justify-center gap-2">
              <span>Friends:</span>
              <span>{userData.friends?.length}</span>
            </p>
            <p className="flex justify-center gap-2">
              <span>Posts:</span>
              <span>{userData.posts?.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
};

export default ViewProfile;
