import React, { useContext, useState } from "react"

// Components
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import Overlay from "./Overlay";
import UserAllPosts from "./viewProfileComponents/UserAllPosts";
import { UserContext } from "../hooks/UserContextHook";

// Get userData as prop from mainPage
const ViewProfile: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const { targetUser } = useContext(UserContext)

  return (
    <>
      {isEditOpen && (
        <Overlay />
      )}
      <div className="h-full grid place-items-center my-12">
        <div className="flex flex-col gap-16 text-xl">
          < ProfileImg />
          < Bio openModal={setIsEditOpen} />

          <EditProfileModal isEditOpen={isEditOpen} closeModal={setIsEditOpen} />
        </div>
        <div className="my-20 grid place-items-center">
          <h2 className="text-2xl">
            <span className="font-bold">{targetUser.username} </span>
            posted:
          </h2>
          {targetUser.posts?.length === 0 && (
            <p>Nothing yet!</p>
          )}
          {targetUser.posts && (
            <UserAllPosts />
          )}

        </div>
      </div>
    </>

  )
};

export default ViewProfile;
