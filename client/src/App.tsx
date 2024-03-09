import "./index.css";
import { GiBackup } from "react-icons/gi";
import { IconContext } from "react-icons";

function App(): JSX.Element {
    return (
        <IconContext.Provider value={{
            className: ""
        }}>
            <div className="grid grid-rows-[15%,85%] h-screen
            bg-[#1a1919] text-white font-[Nunito]">
                <div className="grid grid-cols-[10%_70%_20%] border-b-2 border-borderGray">
                    <div className="text-6xl flex justify-center
                    items-center">
                        <svg width="1em" height="1em">
                            {/* Setting linear gradient for logo */}
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#e4e9f2" offset="0%" />
                                <stop stopColor="#71a1f0" offset="100%" />
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
                                src="../public/profPic.jpg" alt="" />
                            <p className="profileName">Michael</p>
                        </div>
                    </div>
                </div>

                <div className=" grid grid-cols-[10%_70%_20%]">
                    {/* Sidebar */}
                    <div className="grid grid-rows-[65%_35%] 
                    border-r-2 border-borderGray">
                        <ul className="flex justify-start items-center mt-10 ml-2 
                        flex-col gap-10 list-none">
                            <li>icon </li>
                            <li>icon </li>
                            <li>icon</li>
                            <li>icon</li>
                            <li>icon</li>
                        </ul>
                        <div className="border-t-2 border-borderGray pt-10
                        flex flex-col items-center justify-around">
                            <p>V 1.0.0.</p>
                            <p>Icon for dark/light mode</p>
                        </div>
                    </div>
                    <div className="flex justify-center" id="main">
                        <p>Ovo je main div</p>
                    </div>
                    {/* Message div, another sidebar */}
                    <div className="border-l-2 border-borderGray flex
                    flex-col items-center pt-10">
                        <h3 className="text-2xl">Messages</h3>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default App;
