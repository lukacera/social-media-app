import React, { useContext, useEffect, useState } from "react";
import PostContent from "./postContentComponents/PostContent";
import PostCreatorInfo from "./postContentComponents/PostCreatorInfo";
import { postType } from "../../../../server/types/postType";
import { UserContext } from "../../hooks/UserContextHook";
import DeletePostBtn from "./DeletePostButton";
import LikeCommentButtons from "./LikeCommentButtons";

const SinglePostComponent: React.FC<{ post: postType }> = ({ post }) => {
    const { currentUserData } = useContext(UserContext);
    const [isThisUsersPost, setIsThisUsersPost] = useState<boolean>(false);

    useEffect(() => {
        // Check if the post exists and if it's the current user's post
        if (post) {
            setIsThisUsersPost(currentUserData._id === post.creator._id);
        }
    }, [currentUserData._id, post]);

    return (
        <div className="w-[30rem] flex flex-col gap-20">
            {post && (
                <div className="grid gap-10">
                    <PostCreatorInfo post={post} />
                    <PostContent post={post} />
                </div>
            )}
            <div className="flex justify-between">
                {post && <LikeCommentButtons post={post} />}
                {isThisUsersPost && post && (
                    <div className="flex justify-end items-center gap-5">
                        <DeletePostBtn post={post} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePostComponent;
