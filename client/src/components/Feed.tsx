import { ReactNode, useState, useEffect } from "react"
import { getAllPosts } from "../api/getAllPostsApi";
import { postType } from "../../../server/types/postType";

// Components
import LikeComment from "./postComponents/likeCommentComponent";
import PostContent from "./postComponents/PostContent";
import PostCreatorInfo from "./postComponents/PostCreatorInfo";

export const Feed = (): ReactNode => {
    const [posts, setPosts] = useState<postType[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                const reversedData = data.reverse()
                setPosts(reversedData)
            }
            catch (error) {
                console.error("Error occured while fetching all posts from DB: " + error)
            }
            setLoading(false)
        }
        fetchPosts()
    }, [])

    return (
        <div className="flex flex-col items-center gap-10 overflow-auto
                removeWebkit">
            <h2 className="mt-10 text-4xl tracking-widest font-bold">Feed</h2>
            {/* All posts div */}
            {!loading && (
                <div className="flex flex-col gap-20 my-20">
                    {posts && posts?.length > 0 && posts.map((post, index) => (
                        // Single post div
                        <div key={index} className="w-[30rem] flex flex-col gap-16">
                            <div className="grid gap-10">
                                <PostCreatorInfo post={post} />
                                < PostContent post={post} />
                            </div>
                            <div className="flex flex-col">
                                < LikeComment post={post} />
                            </div>
                        </div >
                    ))}
                    {
                        posts && posts.length === 0 && (
                            <p>There are no posts currently!</p>
                        )
                    }
                </div >

            )}
        </div >
    )
}

