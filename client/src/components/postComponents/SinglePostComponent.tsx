import React, { useContext } from "react"
// Components
import LikeComment from "./likeCommentComponent";
import PostContent from "./PostContent";
import PostCreatorInfo from "./PostCreatorInfo";
import { postType } from "../../../../server/types/postType";
import { UserContext } from "../../hooks/UserContextHook";
import DeletePostBtn from "./DeletePostButton";


const SinglePostComponent: React.FC<{ post: postType }> = ({ post }) => {

    const { currentUserData } = useContext(UserContext)
    const isThisUsersPost: boolean = (
        currentUserData._id === post.creator._id
    );

    return (
        <div className="w-[30rem] flex flex-col gap-20">
            <div className="grid gap-10">
                <PostCreatorInfo post={post} />
                < PostContent post={post} />
            </div>
            <div className="flex justify-between">
                < LikeComment post={post} />
                {isThisUsersPost && (
                    <div className="flex justify-end items-center gap-5">
                        <p className="text-lg font-merryweather tracking-wide">
                            Delete my post:
                        </p>
                        < DeletePostBtn post={post} />
                    </div>
                )}
            </div>

        </div >
    )
};

export default SinglePostComponent;
