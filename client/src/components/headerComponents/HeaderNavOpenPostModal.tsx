import React from "react"

// Button in HeaderNav, which opens form for new post
const OpenPostModal: React.FC<{ handleOpenModal: React.Dispatch<React.SetStateAction<boolean>> }> = ({ handleOpenModal }) => {
    return (
        <p className="flex items-center gap-3 font-merryweather">
            <span className="text-xl">New post</span>
            <span className="text-2xl px-4 py-2 bg-white 
    text-black rounded-full cursor-pointer" onClick={() => handleOpenModal(true)}>
                +
            </span>
        </p>
    )
};

export default OpenPostModal;
