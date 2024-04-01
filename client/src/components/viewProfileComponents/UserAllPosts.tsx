import React from 'react';
import { postType } from '../../../../server/types/postType';
import SinglePostComponent from '../postComponents/SinglePostComponent';

const UserAllPosts: React.FC<{
    targetUserPosts: postType[]
}> = ({ targetUserPosts }) => {

    return (
        <div className="flex flex-col justify-center gap-40 my-20 w-auto">
            {targetUserPosts.map((post: postType, index: number) => (
                <div key={index}>
                    <SinglePostComponent post={post} />
                </div>
            ))}
        </div>
    );
};

export default UserAllPosts;


