import React from "react"
import { getAvatarURL } from "../../constants/avatarURL";
import moment from "moment";
import { postType } from "../../../../server/types/postType";

const PostCreatorInfo: React.FC<{ post: postType }> = ({ post }) => {
    return (
        <div className="flex flex-col items-center
                                        gap-10 cursor-pointer">
            <div className="flex flex-col items-center gap-5">
                <img className="w-[4rem] h-[4rem] rounded-full"
                    src={getAvatarURL(post.creator?.avatar || "")} alt="" />
                <p className="text-lg">{post.creator.username}</p>
                <p>{moment(post.postCreatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        </div>
    )
};

export default PostCreatorInfo;
