import React, { RefObject } from "react"
import { FaFileUpload } from "react-icons/fa";

const FileInput: React.FC<{ fileInputRef: RefObject<HTMLInputElement>, previewImage: string }> = ({ fileInputRef, previewImage }) => {
    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    return (
        <div className="grid place-items-center gap-5">
            <label className="tracking-wide" htmlFor="image">
                Choose image (not required):
            </label>
            <div onClick={openFileInput} className="px-5 py-3 bg-blue-500 rounded-xl
                flex gap-2 items-center cursor-pointer">
                < FaFileUpload />
                <span>
                    Upload image
                </span>
            </div>

            {previewImage && (
                <img className="w-24" src={previewImage} alt="" />
            )}
        </div>
    )
};

export default FileInput;
