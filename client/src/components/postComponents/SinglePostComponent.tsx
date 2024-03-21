import React from "react"
// Components
import LikeComment from "./likeCommentComponent";
import PostContent from "./PostContent";
import PostCreatorInfo from "./PostCreatorInfo";

import { postType } from "../../../../server/types/postType";


const SinglePostComponent: React.FC<{ post: postType }> = ({ post }) => {
    return (
        <div className="w-[30rem] flex flex-col gap-16">
            <div className="grid gap-10">
                <PostCreatorInfo post={post} />
                < PostContent post={post} />
            </div>
            <div className="flex flex-col">
                < LikeComment post={post} />
            </div>
        </div >
    )
};

export default SinglePostComponent;
