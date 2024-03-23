import React, { useContext } from 'react';
import { postType } from '../../../../server/types/postType';

import SinglePostComponent from '../postComponents/SinglePostComponent';
import { UserContext } from '../../hooks/UserContextHook';

const UserAllPosts: React.FC = () => {
    // Get currentUserData from Context Provider
    const { targetUser } = useContext(UserContext)

    return (
        <div className="my-12 grid place-items-center gap-20">

            {/* Convert type from array of ObjectID to array of postTypes */}
            {(targetUser.posts as unknown as postType[])?.map((post: postType, index: number) => (
                <div key={index}>
                    <SinglePostComponent post={post} />
                </div>
            ))}
        </div>
    );
};


export default UserAllPosts;
