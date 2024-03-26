import React, { useContext, useRef, useState } from "react"
import Overlay from "../../Overlay";

import { createNewPost } from "../../../api/postAPIs/createNewPostApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../hooks/UserContextHook";
import { postType } from "../../../../../server/types/postType";
import FileInput from "./FileInput";
import CreatePostButton from "./CreatePostButton";
import TextInputPost from "./TextInputPost";
const CreatePostModal: React.FC<{
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ closeModal }) => {

  const { targetUser, setTargetUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState<string>("");

  // Set initial state for post content(image and text)
  const emptyFile = new File([], "");
  const [imageFile, setImageFile] = useState<File>(emptyFile);
  const [postContent, setPostContent] = useState<string>('');

  // Use ref for hidden input
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleCloseModal = () => {
    closeModal(false)
  }

  // Send form data to server and close the form
  const handleSubmit = async () => {

    console.log("Handle submit!")
    try {

      // Try to create new post
      const post: postType = await createNewPost(imageFile, postContent);

      // Create a new array with the new post's ID added to it
      const updatedPosts = targetUser.posts ? [...targetUser.posts] : [];
      if (post._id) {
        updatedPosts.push(post._id);
      }

      // Update the targetUser state with the new array
      setTargetUser(prevData => ({
        ...prevData,
        posts: updatedPosts
      }));

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

  return (
    <>
      <Overlay />
      <div className="z-10 absolute top-[15%] left-[32%]">
        <form className="p-10 bg-profileColor
          grid place-items-center gap-10 relative">

          <span className="absolute top-3 right-5 cursor-pointer"
            onClick={handleCloseModal}>X</span>
          <h3 className="text-2xl font-bold">Create new post:</h3>

          <div className="grid gap-16">

            {/* File input for img */}
            <FileInput fileInputRef={fileInputRef} previewImage={previewImage} />

            {/* Input for text content of post */}
            < TextInputPost postContent={postContent} setPostContent={setPostContent} />
          </div>

          <div onClick={() => handleSubmit()}>
            < CreatePostButton />

          </div>
          {/* Hidden input, which will be called upon by useRef */}
          <input className="hidden" ref={fileInputRef}
            type="file" id="image" onChange={handleFileChange} />
        </form>
      </div>
    </>

  )
};

export default CreatePostModal;
