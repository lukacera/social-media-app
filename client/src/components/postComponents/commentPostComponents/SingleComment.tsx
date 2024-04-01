import React, { useContext, useEffect, useState } from "react"
import { getImgURL } from '../../../constants/imgURL';
import moment from "moment";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { commentType } from "../../../../../server/types/commentType";
import { UserContext } from "../../../hooks/UserContextHook";
import { deleteComment } from "../../../api/commentAPIs/deleteCommentApi";
import { postType } from "../../../../../server/types/postType";
const SingleComment: React.FC<{
    comment: commentType,
    post: postType
}> = ({ comment, post }) => {

    const { currentUserData } = useContext(UserContext)

    const [isUsersComment, setIsUsersComment] = useState<boolean>(false)

    useEffect(() => {
        setIsUsersComment(currentUserData._id === comment.creator._id);
    }, [currentUserData, comment]);

    const handleDeleteComment = async () => {
        try {
            post._id && await deleteComment(post._id, comment._id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="flex flex-row items-start gap-5 text-[0.8rem]
            lg:text-base">
                <Link to={`/users/${comment.creator.username}`}>
                    <img className="w-10 h-10 lg:w-16 lg:h-16 rounded-full"
                        src={getImgURL(comment.creator.avatar || "")} alt="" />
                </Link>
                <div className="flex justify-between w-full pl-2">
                    <Link to={`/users/${comment.creator.username}`}
                        className="font-bold text-gray-400 
                                    text-[1.2rem]">
                        @{comment.creator.username}
                    </Link>
                    <p className="flex items-center gap-2">
                        <span><FaCalendarAlt /></span>
                        <span className="hidden md:block">
                            {moment(comment.commentCreatedAt).format("DD/MM/YY, HH:mm:ss")}
                        </span>
                        <span className="block md:hidden">
                            {moment(comment.commentCreatedAt).format("DD/MM/YY")}
                        </span>
                    </p>
                </div>
            </div>

            <div className=" h-auto mt-10 flex justify-between items-center">
                <p className="break-words text-[1.1rem]
                max-w-[35rem]">
                    {comment.text}
                </p>
                {isUsersComment && (
                    <p className="text-2xl text-red-500 cursor-pointer"
                        onClick={() => handleDeleteComment()}>
                        <FaTrash />
                    </p>
                )}

            </div>

        </div>
    )
};

export default SingleComment;
