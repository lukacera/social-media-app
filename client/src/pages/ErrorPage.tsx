import "../assets/index.css";

import HeaderNav from "../components/HeaderNav";
const ErrorPage = () => {
    return (
        <div className="grid  h-screen
            bg-backgroundDark text-white font-[Nunito]
            grid-rows-[25%_75%]
            sm:grid-rows-[15%,85%]">
            <HeaderNav />
            <p className="pageNotFoundParagraph">
                Page not found!
            </p>
        </div>
    )
};

export default ErrorPage