import "./assets/index.css";
import { GiBackup } from "react-icons/gi";
import { FaMoon, FaHome } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { ReactNode } from "react";

import { USERS, createRandomUser, POSTS } from "./helpers/fakerHelper";

function App(): JSX.Element {
    const profileUser = createRandomUser()

    type postImgUrls = string[]

    const postImgUrls: postImgUrls = [];
    POSTS.forEach(post => {
        postImgUrls.push(post.url)
    })
    type IconType = {
        icon: ReactNode
    }
    const sidebarIcons: IconType[] = [
        { icon: <FaHome /> },
        { icon: < IoMdPersonAdd /> },
    ];
    return (

        <div className="grid grid-rows-[15%,85%] h-screen
            bg-[#1a1919] text-white font-[Nunito]">
            <div className="grid grid-cols-[10%_70%_20%] border-b-2 border-borderGray">
                <div className="text-6xl flex justify-center
                    items-center">
                    <svg width="1em" height="1em">
                        {/* Setting linear gradient for logo */}
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#65ade3" offset="0%" />
                            <stop stopColor="#094572" offset="100%" />
                        </linearGradient>
                        {/* @ts-expect-error Style can be declared here */}
                        <GiBackup style={{ fill: "url(#blue-gradient)" }} />
                    </svg>
                </div>
                <h1 className="flex justify-start pl-20 items-center text-4xl
                    font-[Inter] tracking-widest">Bondify</h1>
                {/* Profile div */}
                <div className="flex justify-center items-center">
                    <div className="profileWrapper">
                        <img className="w-12 h-12 rounded-full"
                            src={profileUser.avatar} alt="" />
                        <p className="profileName">{profileUser.username}</p>
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-[10%_70%_20%]">
                {/* Sidebar */}
                <div className="grid grid-rows-[65%_35%] 
                    border-r-2 border-borderGray">
                    <ul className="flex justify-start items-center mt-24 ml-2 
                        flex-col gap-20 list-none">
                        {sidebarIcons.map((icon, index) => (
                            <li className="liSidebar" key={index}>
                                {icon.icon}
                            </li>
                        ))}
                    </ul>
                    <div className="border-t-2 border-borderGray pt-10
                        flex flex-col items-center justify-around">
                        <p>V 1.0.0</p>
                        <div className="cursor-pointer">
                            <FaMoon />
                        </div>
                    </div>
                </div>
                {/* Main div */}
                <div className="flex flex-col items-center gap-10 overflow-auto
                removeWebkit" id="main">
                    <h2 className="mt-10 text-4xl tracking-widest font-bold">Feed</h2>
                    {/* All posts div */}
                    <div className="flex flex-col gap-20">
                        {postImgUrls.map((url, index) => (
                            // Single post div
                            <div key={index} className="max-w-[50rem] mb-20">
                                <div className="flex items-center
                                justify-center gap-10 m-10">
                                    <img className="w-10 rounded-full"
                                        src={profileUser.avatar} alt="" />
                                    <p>{profileUser.username}</p>
                                </div>
                                <div className="flex flex-col items-center
                                gap-10 justify-center">
                                    <img className="max-w-[30rem]" src={url} alt="" />
                                    <p className="text-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem numquam quaerat harum ipsum veniam facere aspernatur dicta delectus, iusto amet tempora repudiandae animi beatae nostrum eos nesciunt. Numquam, voluptates quo.
                                    </p>
                                </div>
                                <div className="flex gap-5">
                                    <p>Like post</p>
                                    <p>Add a comment</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Message div, another sidebar */}
                <div className="border-l-2 border-borderGray flex
                    flex-col items-center gap-10 pt-10">
                    <h3 className="text-2xl">Messages</h3>
                    {USERS.map((user, index) => (
                        <div className="profileWrapper" key={index}>
                            <img className="w-12 h-12 rounded-full"
                                src={user.avatar} alt={user.username} />
                            <p className="profileName">{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
