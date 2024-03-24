import React, { useState } from "react"

const CreatePostButton: React.FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    return (
        <button className="px-5 py-2 bg-white text-black rounded-lg 
            mt-5 border-2 text-[1.4rem]"
            onClick={() => setIsClicked(true)}
            disabled={isClicked}>
            Create post
        </button>
    )
};

export default CreatePostButton;
