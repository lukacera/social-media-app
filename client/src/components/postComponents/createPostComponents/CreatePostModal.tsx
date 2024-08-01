import React, { useRef, useState } from "react"

import { createNewPost } from "../../../api/postAPIs/createNewPostApi";
import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput";
import TextInputPost from "./TextInputPost";

const CreatePostModal: React.FC<{
  setIsModalNewPostOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isModalNewPostOpen: boolean
}> = ({ setIsModalNewPostOpen, isModalNewPostOpen }) => {

  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState<string>("");

  // Set initial state for post content(image and text)
  const emptyFile = new File([], "");
  const [imageFile, setImageFile] = useState<File>(emptyFile);
  const [postContent, setPostContent] = useState<string>('');


  // Use ref for hidden input
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleCloseModal = () => {
    setIsModalNewPostOpen(false)
  }

  // Send form data to server and close the form
  const handleSubmit = async () => {

    try {

      // Try to create new post
      await createNewPost(imageFile, postContent);

      // Close modal and navigate to home page (feed)
      handleCloseModal();
      navigate("/home");

    } catch (error) {
      console.log("Error occurred while creating new post! " + error);
    }
  };


  // Handle any user image upload, update both previewImg and file Img 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      setImageFile(file)
      reader.readAsDataURL(file);
    }
  };

  return !isModalNewPostOpen ? null : (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <form className="p-6 sm:p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={handleCloseModal}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-6">Create new post</h3>

        <div className="space-y-6">
          <FileInput
            fileInputRef={fileInputRef}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
          />

          <TextInputPost
            postContent={postContent}
            setPostContent={setPostContent}
          />
        </div>

        {postContent.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Create Post
            </button>
          </div>
        )}

        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          id="image"
          onChange={handleFileChange}
        />
      </form>
    </div>
  </div>
);

};

export default CreatePostModal;
