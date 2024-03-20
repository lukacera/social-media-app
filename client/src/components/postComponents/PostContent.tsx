import React from "react"
import { postType } from "../../../../server/types/postType";
const PostContent: React.FC<{ post: postType }> = ({ post }) => {
  return (
    <div className="grid place-items-center">
      {post.img && (
        <img className="max-w-[30rem]" src={post.img} alt="" />
      )}
      <p className="text-lg">
        {post.text}
      </p>
    </div>
  )
};

export default PostContent;
