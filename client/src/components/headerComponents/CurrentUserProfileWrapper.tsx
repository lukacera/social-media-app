import { useContext, useState } from "react"
import { getImgURL } from "../../constants/imgURL";
import { UserContext } from "../../hooks/UserContextHook";
import DropdownMenu from "./DropdownMenu";
const CurrentUserProfileWrapper = () => {

    const { currentUserData } = useContext(UserContext)

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    return (
        <section>
            <div className="w-12 relative
                 hidden xl:w-auto lg:block">
                <div className="bg-profileColor rounded-full border-[1px] 
                    border-gray-600 flex items-center gap-5   
                        overflow-hidden cursor-pointer
                        xl:px-6 xl:py-2 xl:w-[20rem]"
                    onClick={() => setShowDropdown(!showDropdown)}>
                    <img className="w-12 h-12 rounded-full"
                        src={getImgURL(currentUserData.avatar || "")} alt="" />
                    <p className="border-l-2 text-[1.2rem] tracking-wide pl-5
                    max-w-[12rem] text-wrap hidden lg:flex">
                        {currentUserData.username}
                    </p>
                </div>
                {showDropdown && <DropdownMenu
                    setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
                }
            </div>
        </section>
    )
};

export default CurrentUserProfileWrapper;
