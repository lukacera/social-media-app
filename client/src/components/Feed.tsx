import { ReactNode, useState, useEffect } from "react";
import { getAllPosts } from "../api/postAPIs/getAllPostsApi";
import { postType } from "../../../server/types/postType";
import SinglePostComponent from "./postComponents/SinglePostComponent";
import io from "socket.io-client";
const socket = io("http://localhost:3000"); // Replace with your server URL

export const Feed = (): ReactNode => {

    const [posts, setPosts] = useState<postType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getAllPosts();
                console.log("Fetching posts...");
                const reversedPosts = fetchedPosts.reverse();
                setPosts(reversedPosts);
            } catch (error) {
                console.error("Error occurred while fetching all posts from DB: " + error);
            }
            setLoading(false);
        };

        // Fetch initial posts when component mounts
        fetchPosts();

        // Listen for "newPost" events from the server
        socket.on('newPost', (newPost: postType) => {
            console.log("Post created!")
            setPosts(prevPosts => [newPost, ...prevPosts]);
        });

        // Listen for "deletePost" events from the server
        socket.on('deletePost', (deletedPost: postType) => {
            console.log("Post deleted!")
            setPosts(prevPosts => (
                prevPosts = prevPosts.filter(post => post._id !== deletedPost._id)
            ));
        });

        return () => {
            socket.disconnect();
        };
    }, []);


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

