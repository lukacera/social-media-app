import React, { useState, useEffect, useContext } from "react"
import { likePost } from "../../../api/likeAPIs/likePostApi";
import { unlikePost } from "../../../api/likeAPIs/unlikePostApi";
import { UserContext } from "../../../hooks/UserContextHook";
import { FaHeart } from "react-icons/fa";
import { postType } from "../../../../../server/types/postType";

const LikePost: React.FC<{ post: postType }> = ({ post }) => {


    const [isLiked, setIsLiked] = useState<boolean>(false);

    const [numberLikes, setNumberLikes] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(false)

    const { currentUserData } = useContext(UserContext);


    useEffect(() => {
        setNumberLikes(post.likes.length)
    }, [post])

    useEffect(() => {
        const isLikedByCurrentUser = post.likes.some(like => like._id === currentUserData._id);
        setIsLiked(isLikedByCurrentUser);

    }, [currentUserData._id, post.likes]);


    const handleLike = async () => {
        try {
            if (post._id) {

                // Add loading phase to prevent user to click on like while request to server is
                // in process
                setLoading(true)

                await likePost(post._id);
                setIsLiked(true);
                setNumberLikes(prevNumberLikes => prevNumberLikes + 1);

                setLoading(false)
            }
        } catch (error) {
            console.error("Error occurred while liking post: " + error);
        }
    };

    const handleUnlike = async () => {
        try {
            if (post._id) {

                // Add loading phase to prevent user to click on like while request to server is
                // in process
                setLoading(true)

                await unlikePost(post._id);
                setIsLiked(false);
                setNumberLikes(prevNumberLikes => prevNumberLikes - 1);

                setLoading(false)
            }
        } catch (error) {
            console.error("Error occurred while unliking post: " + error);
        }
    };
    return (
        <div className="flex items-center gap-2">
            <button
                disabled={loading}
                onClick={!loading ? (isLiked ? handleUnlike : handleLike) : undefined}
                className={`cursor-pointer 
                            ${isLiked
                        ? "text-red-600"
                        : "text-white"}`}>
                <FaHeart />
            </button>
            <span>{numberLikes}</span>
        </div>
    )
};

export default LikePost;
