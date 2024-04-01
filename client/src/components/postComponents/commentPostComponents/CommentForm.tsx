import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { postType } from '../../../../../server/types/postType';
import { getImgURL } from '../../../constants/imgURL';
import { UserContext } from '../../../hooks/UserContextHook';
import { createNewComment } from '../../../api/commentAPIs/createNewCommentApi';
import { commentType } from '../../../../../server/types/commentType';

const CommentForm: React.FC<{
    post: postType,
    setIsCommentFormOpen: Dispatch<SetStateAction<boolean>>,
    comments: commentType[]
}> = ({ post, setIsCommentFormOpen, comments }) => {

    const { currentUserData } = useContext(UserContext)
    const [text, setText] = useState('');


    const handleCreateComment = async () => {
        try {
            post._id && await createNewComment(post._id, text);
        } catch (error) {
            console.error("Error occurred while creating comment: " + error);
        }

        setText(''); // Clear input after submission
    };

    return (
        <>
            <div >
                <div className="bg-profileColor grid
                place-items-center gap-10 relative px-10 py-5">
                    <span onClick={() => setIsCommentFormOpen(false)}
                        className="absolute top-5 right-5 cursor-pointer
                        text-2xl">
                        X
                    </span>
                    <p className='flex justify-start w-full gap-1
                    font-bold text-xl'>
                        <span>
                            {comments.length}
                        </span>
                        <span>
                            {comments.length === 1
                                ? "Comment"
                                : "Comments"
                            }
                        </span>
                    </p>
                    <div className='flex gap-5 items-end justify-start w-full'>
                        <img className='w-10 h-10 rounded-full'
                            src={getImgURL(currentUserData.avatar || "")} alt=""
                        />
                        <div className='w-full relative'>
                            <input type="text" className='bg-transparent
                            border-b-2 border-borderGray w-full outline-none
                            py-2 px-4'
                                placeholder='Your comment...'
                                value={text}
                                onChange={(e) => setText(e.target.value)} />

                            {text.length > 0 && (
                                <button className="bg-white text-black 
                                rounded-lg mt-5 border-2 absolute 
                                top-10 w-[6rem] py-1 sm:px-5 md:py-2
                                text-[0.8rem] right-0 sm:w-auto sm:text-base"
                                    onClick={handleCreateComment}>
                                    Add comment
                                </button>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CommentForm;
