import React from "react"
import { getImgURL } from '../../../constants/imgURL';
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { commentType } from "../../../../../server/types/commentType";
const SingleComment: React.FC<{
    comment: commentType,
}> = ({ comment }) => {
    return (
        <div>
            <div className="flex flex-row items-start gap-5">
                <Link to={`/users/${comment.creator.username}`}>
                    <img className="w-16 h-16 rounded-full"
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
                        <span>{moment(comment.commentCreatedAt).format("DD/MM/YY, HH:mm:ss")}</span>
                    </p>
                </div>
            </div>

            <div className="max-w-[40rem] h-auto mt-10">
                <p className="break-words text-[1.1rem]">
                    {comment.text}
                </p>
            </div>

        </div>
    )
};

export default SingleComment;
