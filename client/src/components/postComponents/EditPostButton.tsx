import React from "react"
import { AiOutlineEdit } from 'react-icons/ai';

const EditPostButton: React.FC = () => {
  return (
    <div onClick={() => console.log("Edit!")} className="text-blue-600 
        cursor-pointer text-[1.7rem]">
      < AiOutlineEdit title="Edit post" />
    </div>
  )
};

export default EditPostButton;
