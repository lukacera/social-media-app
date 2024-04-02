import React, { Dispatch, SetStateAction, useContext } from "react"
import { deletePost } from "../../api/postAPIs/deletePostApi";
import { UserContext } from "../../hooks/UserContextHook";
import { postType } from "../../../../server/types/postType";

const ConfirmDelete: React.FC<{
    setOpenConfirmDelete: Dispatch<SetStateAction<boolean>>
    post: postType
}> = ({ setOpenConfirmDelete, post }) => {

    const { currentUserData, setCurrentUserData } = useContext(UserContext)

    // Delete post from DB and close modal 
    const handleDeletePost = async () => {
        try {
            await deletePost(post._id)
            const filteredPosts = currentUserData.posts?.filter(trgUserPost =>
                trgUserPost._id !== post._id)
            setCurrentUserData(prevData => ({
                ...prevData,
                posts: filteredPosts
            }))
            setOpenConfirmDelete(false)
        } catch (error) {
            console.error("Error occured while deleting: " + error)
        }
    }
    return (
        <div className="absolute  bg-profileColor p-20
        grid place-items-center gap-10 rounded-xl inset-0 m-auto
        w-[90%] max-w-[40rem] h-[80%] max-h-[25rem]">
            <p className="text-[1.2rem] font-bold tracking-wide">
                Are you sure that you want to delete this post?
            </p>
            <div className="w-[60%] max-w-[8rem] flex flex-col gap-10
            sm:w-full sm:flex-row justify-center">

                <button className="px-5 py-3 bg-red-600 rounded-lg"
                    onClick={handleDeletePost}>
                    Delete
                </button>
                <button className="px-5 py-3 bg-blue-600 rounded-lg"
                    onClick={() => setOpenConfirmDelete(false)}>
                    Cancel
                </button>

            </div>
        </div>
    )
};

export default ConfirmDelete;
