import { ReactNode } from "react"
import { POSTS } from "../helpers/fakerHelper";
import { FaHeart, FaCommentAlt } from "react-icons/fa";
export const Feed = (): ReactNode => {

    return (
        <div className="flex flex-col items-center gap-10 overflow-auto
                removeWebkit">
            <h2 className="mt-10 text-4xl tracking-widest font-bold">Feed</h2>
            {/* All posts div */}
            <div className="flex flex-col gap-20 my-20">
                {POSTS.map((post, index) => (
                    // Single post div
                    <div key={index} className="max-w-[50rem]
                    flex flex-col gap-5">
                        <div className="flex flex-col items-center
                            gap-10 cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                                <img className="w-10 rounded-full"
                                    src={post.userAvatar} alt="" />
                                <p className="text-lg">{post.username}</p>
                            </div>
                            <p>{post.createdAt}</p>
                        </div>
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col items-center
                                    gap-10 justify-center">
                                <img className="max-w-[30rem]" src={post.url} alt="" />
                                <p className="text-lg">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem numquam quaerat harum ipsum veniam facere aspernatur dicta delectus, iusto amet tempora repudiandae animi beatae nostrum eos nesciunt. Numquam, voluptates quo.
                                </p>
                            </div>
                            <p className="p-5 cursor-pointer w-[20%] flex justify-center
                            bg-profileColor gap-5 rounded-full">
                                <span
                                    className="text-red-500 flex items-center gap-2">
                                    <FaHeart />
                                    0
                                </span>
                                <span className="text-blue-600 flex items-center gap-2">
                                    <FaCommentAlt />
                                    0
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

