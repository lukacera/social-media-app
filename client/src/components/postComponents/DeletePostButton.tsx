import React, { useContext } from "react"
import { deletePost } from "../../api/postAPIs/deletePostApi";
import { UserContext } from "../../hooks/UserContextHook";

import { FaTrash } from "react-icons/fa";
import { postType } from "../../../../server/types/postType";

const DeletePostBtn: React.FC<{ post: postType }> = ({ post }) => {

    const { targetUser, setTargetUser } = useContext(UserContext)
    const handleDeletePost = async () => {
        await deletePost(post._id)
        const filteredPosts = targetUser.posts?.filter(trgUserPost =>
            trgUserPost._id !== post._id)
        setTargetUser(prevData => ({
            ...prevData,
            posts: filteredPosts
        }))
    }
    return (
        <div onClick={handleDeletePost} className="text-red-600 
        cursor-pointer text-[1.5rem]">
            < FaTrash />
        </div>
    )
};

export default DeletePostBtn;
