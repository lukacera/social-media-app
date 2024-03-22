import React from "react"
import { getImgURL } from "../../constants/imgURL";
import moment from "moment";
import { postType } from "../../../../server/types/postType";
import { Link } from "react-router-dom";
const PostCreatorInfo: React.FC<{ post: postType }> = ({ post }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
                <Link className="grid gap-3 place-items-center"
                    to={`/users/${post.creator.username}`}>
                    <img className="w-[4rem] h-[4rem] rounded-full"
                        src={getImgURL(post.creator?.avatar || "")} alt="" />
                    <p className="text-lg">{post.creator.username}</p>
                </Link>
                <p>{moment(post.postCreatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        </div>
    )
};

export default PostCreatorInfo;
