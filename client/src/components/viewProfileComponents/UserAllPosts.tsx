import React from 'react';
import { postType } from '../../../../server/types/postType';
import SinglePostComponent from '../postComponents/SinglePostComponent';

const UserAllPosts: React.FC<{
    targetUserPosts: postType[]
}> = ({ targetUserPosts }) => {

    return (
        <div className="my-12 grid place-items-center gap-20">
            {targetUserPosts.map((post: postType, index: number) => (
                <div key={index}>
                    <SinglePostComponent post={post} />
                </div>
            ))}
        </div>
    );
};

export default UserAllPosts;


