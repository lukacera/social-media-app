import React, { useState, useEffect, useContext } from "react"
import { postType } from "../../../../../server/types/postType";
import { FaCommentAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";
import AllComments from './AllComments';
import Overlay from '../../Overlay';
import { commentType } from "../../../../../server/types/commentType";

import { socket } from "../../../constants/SocketIoURL";
import { getOnePost } from "../../../api/postAPIs/getPostByIDApi";
import { CommentContext } from "../../../hooks/useCommentsContext";
const CommentPost: React.FC<{ post: postType }> = ({ post }) => {


    const { comments, setComments } = useContext(CommentContext)
    useEffect(() => {
        const fetchComments = async () => {
            let fetchComments: commentType[] = [];
            if (post._id) {
                fetchComments = (await getOnePost(post._id)).comments.reverse()
            }
            setComments(fetchComments)
        }

        fetchComments()

        socket.on('newComment', (newComment: commentType) => {
            console.log("New comment!")
            setComments(prevComments => [newComment, ...prevComments,]);
        });

        socket.on('deleteComment', (commentToDelete: commentType) => {
            console.log("Delete comment!")
            setComments(prevComments => (
                prevComments = prevComments.filter(comment => comment._id !== commentToDelete._id)
            ));
        });

        return () => {
            socket.off("newComment");
            socket.off("deleteComment")
        };
    }, [setComments, post._id]);


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
                    <div className="absolute top-[25%] right-[30%]
                    w-[50rem] max-h-[36rem] overflow-auto customWebkit" >

                        < CommentForm post={post} setIsCommentFormOpen={setisCommentFormOpen} />

                        <AllComments post={post} />

                    </div>
                </>

            )}


        </>

    )
};

export default CommentPost;
