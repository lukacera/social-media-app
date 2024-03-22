import React from "react"
import { postType } from "../../../../server/types/postType";
import { getImgURL } from "../../constants/imgURL";
const PostContent: React.FC<{ post: postType }> = ({ post }) => {
  return (
    <div className="grid place-items-center gap-10">
      {post.img && (
        <img className="max-w-[30rem]" src={getImgURL(post.img)} alt="" />
      )}
      <p className="text-xl font-bold font-merryweather">
        {post.text}
      </p>
    </div>
  )
};

export default PostContent;
