import React, { useContext, useEffect, useState } from "react"
// Components
import LikeComment from "./likeCommentComponent";
import PostContent from "./PostContent";
import PostCreatorInfo from "./PostCreatorInfo";
import { postType } from "../../../../server/types/postType";
import { UserContext } from "../../hooks/UserContextHook";
import DeletePostBtn from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

const SinglePostComponent: React.FC<{ post: postType }> = ({ post }) => {

    const { currentUserData } = useContext(UserContext)
    const [isThisUsersPost, setIsThisUsersPost] = useState<boolean>(false)
    useEffect(() => {
        console.log(isThisUsersPost + ", before")
        setIsThisUsersPost(() => {
            return currentUserData._id === post.creator._id
        })
        console.log(isThisUsersPost + ", after")
    }, [currentUserData._id, post.creator._id, isThisUsersPost])


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
                        < DeletePostBtn post={post} />
                    </div>
                )}
            </div>

        </div >
    )
};

export default SinglePostComponent;
