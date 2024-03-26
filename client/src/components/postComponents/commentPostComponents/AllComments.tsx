import React from "react";
import { postType } from "../../../../../server/types/postType";
import SingleComment from "./SingleComment";

const AllComments: React.FC<{ post: postType }> = ({ post }) => {

    return (
        <div className="bg-profileColor pt-10 pb-16 px-12 grid place-items-center">
            {/* Display existing comments */}
            <ul className="w-full grid place-items-start gap-16 pt-10">

                {post.comments.map((comment, index) => (
                    <li key={index} className="flex flex-col gap-10 w-full">
                        <SingleComment comment={comment} />

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
