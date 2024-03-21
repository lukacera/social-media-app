import React, { useState } from "react"
import { userType } from "../../../server/types/userType";

// Components
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import Overlay from "./Overlay";
import UserAllPosts from "./viewProfileComponents/UserAllPosts";

// Get userData as prop from mainPage
const ViewProfile: React.FC<{ userData: userType, isCurrentUser: boolean }> = ({ userData, isCurrentUser }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  return (
    <>
      {isEditOpen && (
        <Overlay />
      )}
      <div className="h-full grid place-items-center my-12">
        <div className="flex flex-col gap-16 text-xl">
          < ProfileImg isCurrentUser={isCurrentUser} userData={userData} />
          < Bio isCurrentUser={isCurrentUser}
            userData={userData} openModal={setIsEditOpen} />

          <EditProfileModal isEditOpen={isEditOpen} userData={userData}
            closeModal={setIsEditOpen} />
        </div>
        <div className="my-20 grid place-items-center">
          <h2 className="text-2xl">
            <span className="font-bold">{userData.username} </span>
            posted:
          </h2>
          {userData.posts?.length === 0 && (
            <p>Nothing yet!</p>
          )}
          {userData.posts && (
            <UserAllPosts userData={userData} />
          )}

        </div>
      </div>
    </>

  )
};

export default ViewProfile;
