import React, { useState } from "react"


import { FaTrash } from "react-icons/fa";
import { postType } from "../../../../server/types/postType";
import ConfirmDelete from "./ConfirmDelete";
import Overlay from "../Overlay";

const DeletePostBtn: React.FC<{ post: postType }> = ({ post }) => {


    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)

    return (
        <>
            {openConfirmDelete && (
                <div>
                    <Overlay />
                    <ConfirmDelete post={post}
                        setOpenConfirmDelete={setOpenConfirmDelete} />
                </div>
            )}
            <div onClick={() => setOpenConfirmDelete(true)} className="text-red-600 
        cursor-pointer text-[1.5rem]">
                < FaTrash title="Delete post" />
            </div>
        </>

    )
};

export default DeletePostBtn;
