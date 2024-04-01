import React, { Dispatch, RefObject, SetStateAction } from "react"
import { FaFileUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md"; // Import the close icon

const FileInput: React.FC<{
    fileInputRef: RefObject<HTMLInputElement>,
    previewImage: string,
    setPreviewImage: Dispatch<SetStateAction<string>>,
    setImageFile: Dispatch<SetStateAction<File>>
}> = ({ fileInputRef, previewImage, setPreviewImage, setImageFile }) => {
    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    const handleRemoveImg = () => {
        setPreviewImage("");
        setImageFile(new File([], ""))
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
                <div className="w-full relative">
                    <div className="w-full flex justify-center items-center">
                        <img className="w-20 max-h-28" src={previewImage} alt="" />
                    </div>
                    <div className="absolute top-0 -right-5 sm:right-0
                    grid place-items-center gap-2 text-gray-300">
                        <span className="text-sm">
                            Remove image:
                        </span>
                        <MdClose className="cursor-pointer text-lg"
                            onClick={handleRemoveImg} />
                    </div>
                </div>
            )}
        </div>
    )
};

export default FileInput;
