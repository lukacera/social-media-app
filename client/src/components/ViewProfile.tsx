import React from "react"
import { userType } from "../../../server/types/userType";
import { FaPen } from "react-icons/fa";

// Get userData as prop from mainPage
const ViewProfile: React.FC<{ userData: userType, isCurrentUser: boolean }> = ({ userData, isCurrentUser }) => {
  return (
    <>
      <div className="h-full grid place-items-center my-12">
        <div className="flex flex-col gap-16 text-xl">
          <div className="flex flex-col place-items-center gap-10 
            w-[70%] mx-auto">
            <div className="relative">
              <img className="w-[25em] rounded-full" src={userData.avatar} alt="User picture" />
              {isCurrentUser && (
                <div className="absolute right-0 bottom-0 bg-gradient-to-tl 
                  from-white to-linearGradientStart 
                  p-3 text-black rounded-full cursor-pointer">
                  <FaPen />
                </div>
              )}
            </div>

            <h2 className="text-[2.4rem] font-bold">{userData.username}</h2>
          </div>
          <div className="flex flex-col items-center gap-10 relative">
            <h3 className="font-merryweather text-3xl">Bio</h3>
            {isCurrentUser && (
              <div className="absolute left-20 bg-gradient-to-tl 
                  from-white to-linearGradientStart 
                  p-4 text-black rounded-full cursor-pointer">
                <FaPen />
              </div>
            )}
            <div className="flex flex-col gap-5">
              <div className="grid place-items-center">
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
        {userData.posts && userData.posts?.length > 0 && (
          <h2>Posts</h2>
        )}
      </div>
    </>

  )
};

export default ViewProfile;
