import React from 'react';
import { userType } from "../../../../server/types/userType";
import { postType } from '../../../../server/types/postType';

import SinglePostComponent from '../postComponents/SinglePostComponent';


const UserAllPosts: React.FC<{ userData: userType }> = ({ userData }) => {
    return (
        <div className="my-12 grid place-items-center gap-20">
            {/* Convert type from array of ObjectID to array of postTypes */}
            {(userData.posts as unknown as postType[])?.map((post: postType, index: number) => (
                <div key={index}>
                    <SinglePostComponent post={post} />
                </div>
            ))}
        </div>
    );
};


export default UserAllPosts;
