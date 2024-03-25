import React from "react";
import { postType } from "../../../../server/types/postType";
import { getImgURL } from '../../constants/imgURL';
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllComments: React.FC<{ post: postType }> = ({ post }) => {

    return (
        <div className="bg-profileColor pt-10 pb-16 px-12 grid place-items-center">
            {/* Display existing comments */}
            <ul className="w-full grid place-items-start gap-16 pt-10">

                {post.comments.map((comment, index) => (
                    <li key={index} className="flex flex-col gap-10 w-full">

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

                        <div className="max-w-[40rem] h-auto">
                            <p className="break-words">
                                {comment.text}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            {post.comments.length === 0 && (
                <p className="text-2xl pb-20">No comments yet!</p>
            )}
        </div>
    )
};

export default AllComments;
