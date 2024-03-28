import React, { useContext, useEffect, useState } from "react"

// Components
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import Overlay from "./Overlay";
import UserAllPosts from "./viewProfileComponents/UserAllPosts";

import FriendStatusViewProfilePage from "./viewProfileComponents/FriendStatusViewProfilePage";
import { userType } from "../../../server/types/userType";
import { getUser } from "../api/fetchUsersAPIs/getUserApi";
import { UserContext } from "../hooks/UserContextHook";
const ViewProfile: React.FC<{ username: string }> = ({ username }) => {

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [targetUser, setTargetUser] = useState<userType>({} as userType)
  const [loading, setLoading] = useState<boolean>(true)

  const { currentUserData } = useContext(UserContext)


  useEffect(() => {
    const fetchTargetUser = async () => {
      if (username) {
        try {
          // Fetch user data based on the provided username
          const user: userType = await getUser(username);
          // Update the targetUser state with the fetched user data
          setTargetUser(user);
        } catch (error) {
          console.log("Error occurred while fetching target user: " + error);
          // Handle the error accordingly, such as displaying an error message
        }
      }
    };
    fetchTargetUser()
    setLoading(false)
  }, [username])


  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)

  useEffect(() => {
    if (currentUserData?._id === targetUser?._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [currentUserData, targetUser]);


  // Fetch targetUser every time Client requests for different user

  return (
    <>
      <>
        {loading && (
          <p>Loading...</p>
        )}
        {isEditOpen && (
          <Overlay />
        )}
        {!loading && (

          <div className="h-full grid place-items-center my-12">

            <div className="flex flex-col gap-16 text-xl">

              <ProfileImg targetUser={targetUser}
                isCurrentUser={isCurrentUser} />

              <Bio targetUser={targetUser}
                isCurrentUser={isCurrentUser}
                openModal={setIsEditOpen} />

            </div>

            <div className="mt-10">

              {!isCurrentUser && (<FriendStatusViewProfilePage targetUser={targetUser} />)}

              <div className="my-20 grid place-items-center">
                {targetUser.posts && targetUser.posts.length > 0 ? (
                  <h2 className="text-3xl">
                    <span className="font-bold">{targetUser.username} </span>
                    posted:
                  </h2>
                ) : (
                  <p className="text-3xl my-20 flex items-center gap-2">
                    <span className="font-bold">
                      {targetUser.username}
                    </span>
                    <span>has not published any posts</span>
                  </p>
                )}

                {targetUser.posts && (
                  <div className="mt-12">
                    <UserAllPosts targetUser={targetUser} />
                  </div>
                )}
              </div>

            </div>
            <EditProfileModal isEditOpen={isEditOpen} closeModal={setIsEditOpen} />

          </div>

        )}
      </>
    </>
  )
}


export default ViewProfile;
