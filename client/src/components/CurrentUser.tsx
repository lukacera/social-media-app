import { Link } from "react-router-dom";

import CurrentUserProfileWrapper from "./CurrentUserProfileWrapper";


const CurrentUser: React.FC<{ token: string | null }> = ({ token }) => {

    return (
        <>
            {/* If user is logged in, display his profileWrapper */}
            {token && (
                < CurrentUserProfileWrapper />

            )}
            {/* If no user is logged in, instead of profileWrapper, 
            display login button */}
            {!token && (
                <div className="grid place-items-center">
                    <Link to={"/"}>
                        <p className="px-5 py-3 text-xl font-[Nunito] tracking-wide  
                        bg-profileColor border-borderGray text-white border-[1px]
                        hover:bg-white hover:text-black hover:border-none">
                            LOGIN
                        </p>
                    </Link>
                </div>
            )}
        </>
    )
};

export default CurrentUser;
