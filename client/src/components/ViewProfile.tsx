import React, { useContext, useEffect, useState } from "react"

// Components
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import Overlay from "./Overlay";
import UserAllPosts from "./viewProfileComponents/UserAllPosts";
import { UserContext } from "../hooks/UserContextHook";

import { getUser } from "../api/fetchUsersAPIs/getUserApi";
import { useNavigate, useParams } from "react-router-dom";
const ViewProfile: React.FC = () => {

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const { targetUser, setTargetUser, currentUserData, setIsCurrentUser } = useContext(UserContext)

  // Page will load only when loading is false, which means that 
  // targetUser data is fetched and can be displayed to client

  const [loading, setLoading] = useState<boolean>(true)
  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate()

  // Fetch targetUser every time Client requests for different user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(username || "")
        setTargetUser(userData)
        setIsCurrentUser(() => {
          return userData.username === currentUserData.username
        })
        setLoading(false)
      } catch (error) {
        console.error("Error occured while fetchind target user! " + error)
        navigate("/*")
      }

    }

    fetchUser()
  }, [username, setTargetUser, navigate, currentUserData.username, setIsCurrentUser])
  return (
    <>
      {!loading && (
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
      )}

    </>


  )
};

export default ViewProfile;
