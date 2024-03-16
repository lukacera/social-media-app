import "../assets/index.css";

import HeaderNav from "../components/HeaderNav";
const ErrorPage = () => {
    console.log("Error Page render!")
    return (
        <div className="grid grid-rows-[15%,85%] h-screen bg-white
            dark:bg-backgroundDark text-white font-[Nunito]">
            <HeaderNav />
            <p className="pageNotFoundParagraph">
                Page not found!
            </p>
        </div>
    )
};

export default ErrorPage