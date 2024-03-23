import React, { useContext, useRef, useState } from "react"
import Overlay from "../Overlay";
import { FaFileUpload } from "react-icons/fa";
import { createNewPost } from "../../api/postAPIs/createNewPostApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContextHook";
import { postType } from "../../../../server/types/postType";
const CreatePostModal: React.FC<{
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ closeModal }) => {

  const { targetUser, setTargetUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState<string>("");
  const emptyFile = new File([], "");

  const [imageFile, setImageFile] = useState<File>(emptyFile);
  const [postContent, setPostContent] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleCloseModal = () => {
    closeModal(false)
  }

  // Send form data to server and close the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
      console.log(targetUser.posts)
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
          grid place-items-center gap-10 relative"
          onSubmit={handleSubmit}>

          <span className="absolute top-3 right-5 cursor-pointer"
            onClick={handleCloseModal}>X</span>
          <h3 className="text-2xl font-bold">Create new post:</h3>

          <div className="grid gap-16">
            {/* File input for img */}
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
            {/* Input for text content of post */}
            <div className="flex flex-col gap-2">
              <label htmlFor="postContent">Post content:</label>
              <textarea className="p-2 text-black outline-none" spellCheck="false" name="" id="postContent"
                cols={40} rows={10} placeholder="What's on your mind?" value={postContent}
                onChange={(e) => setPostContent(e.target.value)}>
              </textarea>
            </div>
          </div>

          <button className="px-5 py-2 bg-white text-black 
                    rounded-lg mt-5 border-2 text-[1.4rem]">Create post</button>
          <input className="hidden" ref={fileInputRef}
            type="file" id="image" onChange={handleFileChange} />
        </form>
      </div>
    </>

  )
};

export default CreatePostModal;
