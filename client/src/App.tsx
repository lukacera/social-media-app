import "./index.css";
import { GiBackup } from "react-icons/gi";
import { IconContext } from "react-icons";

function App() {
    return (
        <IconContext.Provider value={{
            className: ""
        }}>
            <div className="grid grid-rows-[10%,90%] h-screen
            bg-[#1a1919] text-white ">
                <div className="grid grid-cols-[10%_90%] border-b-2">
                    <div className=" p-5 
                    rounded-full">
                        <GiBackup className="gradient
                        from-purple-400 to-pink-500 text-6xl" />
                    </div>
                    <p className="">dfg</p>
                </div>
                <div className=" grid grid-cols-[10%_70%_20%]">
                    <div className="" id="sidebar">
                        <p>ovo je sidebar div</p>
                    </div>
                    <div className="" id="main">
                        <p>Ovo je main div</p>
                    </div>
                    <div>
                        <p>Ovde ce se nalaziti message div</p>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default App;
