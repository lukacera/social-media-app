import React from "react";
import { postType } from "../../../../server/types/postType";

import CommentPost from "./commentPostComponents/CommentPost";
import LikePost from "./likePostComponents/LikePost";
const LikeCommentButtons: React.FC<{ post: postType }> = ({ post }) => {

    return (
        <div className="w-[10rem]">
            <div>
                <div className="flex gap-10 bg-profileColor justify-center py-5 rounded-full border-[1px] border-borderGray">
                    <LikePost post={post} />
                    <CommentPost post={post} />

                </div>
            </div>
        </div >
    );
};

export default LikeCommentButtons;
