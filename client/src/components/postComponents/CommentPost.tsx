import React, { useState } from "react"
import { postType } from "../../../../server/types/postType";
import { FaCommentAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";
import AllComments from './AllComments';
import Overlay from '../Overlay';

const CommentPost: React.FC<{ post: postType }> = ({ post }) => {

    const [isCommentFormOpen, setisCommentFormOpen] = useState<boolean>(false)
    return (
        <>
            <p className="flex items-center gap-2">
                <span onClick={() => setisCommentFormOpen(true)}
                    className=" text-blue-500 cursor-pointer">
                    <FaCommentAlt />
                </span>
                <span>
                    {post.comments.length}
                </span>
            </p>
            {isCommentFormOpen && (
                <>
                    <Overlay />
                    <div className="absolute top-[25%] right-[30%]
                    w-[50rem] max-h-[36rem] overflow-auto customWebkit" >

                        < CommentForm post={post}
                            setIsCommentFormOpen={setisCommentFormOpen} />

                        <AllComments post={post} />

                    </div>
                </>

            )}


        </>

    )
};

export default CommentPost;
