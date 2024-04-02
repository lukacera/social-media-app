import React, { useState, useEffect } from "react"
import { postType } from "../../../../../server/types/postType";
import { FaCommentAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";
import AllComments from './AllComments';
import Overlay from '../../Overlay';
import { commentType } from "../../../../../server/types/commentType";

import { socket } from "../../../constants/SocketIoURL";
import { getOnePost } from "../../../api/postAPIs/getPostByIDApi";
const CommentPost: React.FC<{ post: postType }> = ({ post }) => {

    const [comments, setComments] = useState<commentType[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            let fetchComments: commentType[] = [];
            if (post._id) {
                fetchComments = (await getOnePost(post._id)).comments.reverse()
            }
            setComments(fetchComments)
        }

        fetchComments()

        // Listen for "commentUpdate" events from the server and add a comment to that post
        socket.on('newComment', (newComment: commentType) => {
            if (newComment.post.toString() === post._id?.toString()) {
                setComments(prevComments => [newComment, ...prevComments])
            }
        });

        // Listen for "deleteComment" updates from the server and delete comment only from that post
        socket.on('deleteComment', (commentToDelete: commentType) => {
            if (commentToDelete.post.toString() === post._id?.toString()) {
                setComments(prevComments => (
                    prevComments.filter(comment => comment._id !== commentToDelete._id)
                ))
            }
        });

        // Unsubscribe from socket events for newComment and deleteComment
        return () => {
            socket.off("newComment");
            socket.off("deleteComment")
        };
    }, [post._id]);


    const [isCommentFormOpen, setisCommentFormOpen] = useState<boolean>(false)
    return (
        <>
            <p className="flex items-center gap-2">
                <span onClick={() => setisCommentFormOpen(true)}
                    className=" text-blue-500 cursor-pointer">
                    <FaCommentAlt />
                </span>
                <span>
                    {comments.length}
                </span>
            </p>
            {isCommentFormOpen && (
                <>
                    <Overlay />
                    <div className="fixed max-h-[36rem] overflow-auto 
                    customWebkit top-[25%] inset-x-0 mx-auto w-[90%] max-w-[50rem]">

                        < CommentForm post={post}
                            setIsCommentFormOpen={setisCommentFormOpen}
                            comments={comments} />

                        <AllComments comments={comments} post={post} />

                    </div>
                </>

            )}


        </>

    )
};

export default CommentPost;
