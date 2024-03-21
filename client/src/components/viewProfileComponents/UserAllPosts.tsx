import React from 'react';
import { userType } from "../../../../server/types/userType";

import { postType } from '../../../../server/types/postType';

import SinglePostComponent from '../postComponents/SinglePostComponent';
// Posts are originally ObjectID[] type, so they do not have postType types 
type UserDataWithPosts = userType & {
    posts?: postType[];
};


const UserAllPosts: React.FC<{ userData: UserDataWithPosts }> = ({ userData }) => {
    return (
        <div className="my-12">
            {userData.posts && (
                <div>
                    {userData.posts.map((post: postType, index: number) => (
                        <div key={index}>
                            < SinglePostComponent post={post} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};

export default UserAllPosts;
