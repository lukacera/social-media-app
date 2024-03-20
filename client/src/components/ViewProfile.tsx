import React, { useState } from "react"
import { userType } from "../../../server/types/userType";

// Components
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import Overlay from "./Overlay";


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
          <EditProfileModal isEditOpen={isEditOpen} userData={userData}
            closeModal={setIsEditOpen} />
        </div>
        {userData.posts && userData.posts?.length > 0 && (
          <h2>Posts</h2>
        )}
      </div>
    </>

  )
};

export default ViewProfile;
