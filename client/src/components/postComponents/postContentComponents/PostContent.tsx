import React from "react"
import { postType } from "../../../../../server/types/postType";
import { getImgURL } from "../../../constants/imgURL";
const PostContent: React.FC<{ post: postType }> = ({ post }) => {
  return (
    <div className="grid place-items-center gap-10">
      {post.img && (
        <img className="w-[30rem] h-[20rem]" src={getImgURL(post.img)} alt="" />
      )}
      <p className="text-xl font-bold font-merryweather w-[80%] max-w-[26rem]
      break-words text-center lg:w-auto lg:text-start">
        {post.text}
      </p>
    </div>
  )
};

export default PostContent;
