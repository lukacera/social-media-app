import { ReactNode, useState, useEffect } from "react"
import { getAllPosts } from "../api/postAPIs/getAllPostsApi";
import { postType } from "../../../server/types/postType";

import SinglePostComponent from "./postComponents/SinglePostComponent";

export const Feed = (): ReactNode => {
    const [posts, setPosts] = useState<postType[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getAllPosts();
                const reversedPosts = posts.reverse()
                setPosts(reversedPosts)
            }
            catch (error) {
                console.error("Error occured while fetching all posts from DB: " + error)
            }
            setLoading(false)
        }
        fetchPosts()
        console.log("Fetch!")
    }, [posts?.length]) // Add dependency, so that posts are immediately updated

    return (
        <div className="flex flex-col items-center gap-10 overflow-auto">
            <h2 className="mt-10 text-4xl tracking-widest font-bold">Feed</h2>
            {/* All posts div */}
            {!loading && (
                <div className="flex flex-col gap-40 my-20">
                    {posts && posts.length > 0 && posts.map((post, index) => (
                        <div key={index}>
                            <SinglePostComponent post={post} />

                        </div>
                    ))}
                    {posts && posts.length === 0 && (
                        <p className="text-3xl tracking-wider
                            grid place-items-center gap-20">
                            <span>There are no posts currently!</span>
                            <span>
                                Press + next to "New post" in header to make new post
                            </span>
                        </p>
                    )
                    }
                </div >

            )}
        </div >
    )
}

