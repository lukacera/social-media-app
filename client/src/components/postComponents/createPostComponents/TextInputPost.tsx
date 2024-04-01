import React, { SetStateAction, Dispatch } from "react"

const TextInputPost: React.FC<{
    postContent: string,
    setPostContent: Dispatch<SetStateAction<string>>
}> = ({ postContent, setPostContent }) => {
    return (
        <div className="flex flex-col gap-2">

            <label htmlFor="postContent">Post content:</label>
            <textarea
                className="p-2 text-black outline-none resize-none
                w-[15rem] h-[10rem]
                sm:w-[20rem] sm:h-[10rem]"
                spellCheck="false" id="postContent"
                placeholder="What's on your mind?"
                value={postContent} onChange={(e) => setPostContent(e.target.value)}
                required={true}>
            </textarea>

        </div>
    )
};

export default TextInputPost;
