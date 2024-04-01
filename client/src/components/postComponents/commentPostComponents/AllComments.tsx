import React from "react";
import { postType } from "../../../../../server/types/postType";
import SingleComment from "./SingleComment";
import { commentType } from "../../../../../server/types/commentType";

const AllComments: React.FC<{
    post: postType,
    comments: commentType[]
}> = ({ post, comments }) => {

    return (
        <div className="bg-profileColor pt-10 pb-16 px-12 
        grid place-items-center ">
            {/* Display existing comments */}
            <ul className="w-full grid place-items-start gap-16 pt-10">

                {comments.length > 0 && comments.map((comment, index) => (
                    <li key={index} className="flex flex-col gap-10 w-full">
                        <SingleComment post={post} comment={comment} />
                    </li>
                ))}
            </ul>
            {comments.length === 0 && (
                <p className="text-2xl pb-20">No comments yet!</p>
            )}
        </div>
    )
};

export default AllComments;
