import React from 'react';
import { postType } from '../../../../server/types/postType';
import SinglePostComponent from '../postComponents/SinglePostComponent';

const UserAllPosts: React.FC<{
    targetUserPosts: postType[]
}> = ({ targetUserPosts }) => {

    // Reverse posts, so that latest posts are shown first
    const reversedPosts = targetUserPosts.reverse()
    return (
        <div className="flex flex-col justify-center gap-40 my-20 w-auto">
            {reversedPosts.map((post: postType, index: number) => (
                <div key={index}>
                    <SinglePostComponent post={post} />
                </div>
            ))}
        </div>
    );
};

export default UserAllPosts;


