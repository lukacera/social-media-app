import React from "react"
import { FaHeart, FaCommentAlt } from "react-icons/fa";
import { postType } from "../../../../server/types/postType";
const LikeComment: React.FC<{ post: postType }> = ({ post }) => {
    return (
        <div className="w-[10rem]">
            <p className="p-5 cursor-pointer 
            flex justify-center bg-profileColor gap-5 rounded-full">
                <span
                    className="text-red-500 flex items-center gap-2">
                    <FaHeart />
                    {post.likes.length}
                </span>
                <span className="text-blue-600 flex items-center gap-2">
                    <FaCommentAlt />
                    {post.comments.length}
                </span>
            </p>
        </div>
    )
};

export default LikeComment;
