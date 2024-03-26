import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';
import { commentType } from '../../../server/types/commentType';

interface CommentContext {
    comments: commentType[],
    setComments: Dispatch<SetStateAction<commentType[]>>;
}

export const CommentContext = createContext<CommentContext>({} as CommentContext);

export const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<commentType[]>([]);

    return (
        <CommentContext.Provider value={{
            comments,
            setComments
        }}>
            {children}
        </CommentContext.Provider>
    );
};
