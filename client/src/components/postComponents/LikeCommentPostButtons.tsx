import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { postType } from "../../../../server/types/postType";
import { likePost } from "../../api/likeAPIs/likePostApi";
import { unlikePost } from "../../api/likeAPIs/unlikePostApi";
import { UserContext } from "../../hooks/UserContextHook";
import { CommentProvider } from "../../hooks/useCommentsContext";
import CommentPost from "./commentPostComponents/CommentPost";
const LikeCommentPostButtons: React.FC<{ post: postType }> = ({ post }) => {


    const { currentUserData } = useContext(UserContext);

    const [isLiked, setIsLiked] = useState<boolean>(false);

    const [numberLikes, setNumberLikes] = useState<number>(post.likes.length)

    useEffect(() => {
        const isLikedByCurrentUser = post.likes.some(like => like._id === currentUserData._id);
        setIsLiked(isLikedByCurrentUser);
    }, [currentUserData._id, post.likes]);

    const handleLike = async () => {
        try {
            if (post._id) {
                await likePost(post._id);
                setIsLiked(true);
                setNumberLikes(prevNumberLikes => (
                    prevNumberLikes + 1
                ))
            }
        } catch (error) {
            console.error("Error occurred while liking post: " + error);
        }
    };

    const handleUnlike = async () => {
        try {
            if (post._id) {
                await unlikePost(post._id);
                setIsLiked(false);
                setNumberLikes(prevNumberLikes => (
                    prevNumberLikes - 1
                ))
            }
        } catch (error) {
            console.error("Error occurred while unliking post: " + error);
        }
    };

    return (
        <div className="w-[10rem]">
            <div>
                <div className="flex gap-10 bg-profileColor justify-center py-5 rounded-full border-[1px] border-borderGray">
                    <p className="flex items-center gap-2">
                        <span onClick={!isLiked ? handleLike : handleUnlike}
                            className={`cursor-pointer ${isLiked ? "text-red-600" : "text-white"}`}>
                            <FaHeart />
                        </span>
                        <span>{numberLikes}</span>
                    </p>
                    <CommentProvider>
                        <CommentPost post={post} />
                    </CommentProvider>

                </div>
            </div>
        </div >
    );
};

export default LikeCommentPostButtons;
