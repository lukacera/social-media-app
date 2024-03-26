import React, { useContext } from "react";
import { postType } from "../../../../../server/types/postType";
import SingleComment from "./SingleComment";
import { CommentContext } from "../../../hooks/useCommentsContext";

const AllComments: React.FC<{
    post: postType
}> = ({ post }) => {

    const { comments } = useContext(CommentContext)
    return (
        <div className="bg-profileColor pt-10 pb-16 px-12 grid place-items-center">
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
