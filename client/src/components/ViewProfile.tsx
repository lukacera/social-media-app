import React, { useContext, useEffect, useState } from "react";
import { userType } from "../../../server/types/userType";
import { getUser } from "../api/fetchUsersAPIs/getUserApi";
import { UserContext } from "../hooks/UserContextHook";
import Overlay from "./Overlay";
import Bio from "./viewProfileComponents/Bio";
import ProfileImg from "./viewProfileComponents/ProfileImg";
import EditProfileModal from "./viewProfileComponents/EditProfileModal";
import UserAllPosts from "./viewProfileComponents/UserAllPosts";
import FriendStatusViewProfilePage from "./viewProfileComponents/FriendStatusViewProfilePage";
import { postType } from "../../../server/types/postType";
import { socket } from "../constants/SocketIoURL";
import LoadingFidget from "./UIComponents/LoadingFidget";

const ViewProfile: React.FC<{ username: string }> = ({ username }) => {

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState<userType>({} as userType);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUserData } = useContext(UserContext);
  const [targetUserPosts, setTargetUserPosts] = useState<postType[]>([]);

  useEffect(() => {
    socket.on('newPost', (newPost: postType) => {
      setTargetUserPosts(prevPosts => [newPost, ...prevPosts]);
    });

    socket.on('deletePost', (deletedPost: postType) => {
      setTargetUserPosts(prevPosts => prevPosts.filter(
        post => post._id !== deletedPost._id));
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off('newPost');
      socket.off('deletePost');
    };
  }, []);

  useEffect(() => {
    const fetchTargetUser = async () => {
      if (username) {
        try {
          const user: userType = await getUser(username);
          setTargetUser(user);
          user.posts && setTargetUserPosts(user.posts)
        } catch (error) {
          console.log("Error occurred while fetching target user: " + error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTargetUser();
  }, [username]);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    setIsCurrentUser(currentUserData?._id === targetUser?._id);
  }, [currentUserData, targetUser]);



  return (
    <>
      {loading && <LoadingFidget />}
      {isEditOpen && <Overlay />}
      {!loading && (
        <div className="h-full grid place-items-center my-12">
          <div className="flex flex-col gap-16 text-xl max-w-[95%] mx-auto">
            <ProfileImg targetUser={targetUser} isCurrentUser={isCurrentUser} />
            <Bio
              targetUser={targetUser}
              isCurrentUser={isCurrentUser}
              openModal={setIsEditOpen}
              targetUserPostsLength={targetUserPosts.length} />
          </div>
          <div className="mt-10">
            {/* Show friend status if profile that user is on is not actually his */}
            {!isCurrentUser && <FriendStatusViewProfilePage targetUser={targetUser} />}
            <div className="my-20 grid place-items-center">
              {targetUserPosts.length > 0
                ? (
                  <>
                    <h2 className="text-3xl">
                      <span className="font-bold">{targetUser.username} </span>
                      posted:
                    </h2>
                    <div className="mt-12">
                      <UserAllPosts
                        targetUserPosts={targetUserPosts} />
                    </div>
                  </>

                ) : (
                  <p className="text-3xl my-20 flex flex-col text-center 
                  items-center gap-2 max-w-[90%]">
                    <span className="font-bold">{targetUser.username}</span>
                    <span>has not published any posts</span>
                  </p>
                )}

            </div>
          </div>
          <EditProfileModal isEditOpen={isEditOpen} closeModal={setIsEditOpen} />
        </div>
      )}
    </>
  );
};

export default ViewProfile;
