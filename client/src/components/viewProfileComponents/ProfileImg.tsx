import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getImgURL } from "../../constants/imgURL";
import { editProfileImg } from "../../api/editProfileDataAPIs/editProfileImgApi";
import { userType } from "../../../../server/types/userType";

const ProfileImg: React.FC<{
    targetUser: userType,
    isCurrentUser: boolean
}> = ({ targetUser, isCurrentUser }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | undefined>(undefined);

    const handleImgChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setImage(result);
            };
            editProfileImg(targetUser.username, file)
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col place-items-center gap-10 ">
            <div className="relative flex items-center gap-10 lg:gap-20">
                {image ? (
                    <img className="w-[7rem] h-[7rem]  lg:w-[10rem]lg:h-[10rem] rounded-full"
                        src={image} alt="User picture" />
                ) : (
                    <img className="w-[7rem] h-[7rem] lg:w-[10rem]  lg:h-[10rem] rounded-full"
                        src={getImgURL(targetUser.avatar || "")} alt="User picture" />
                )}
                {isCurrentUser && (
                    <div className="absolute -left-10 bottom-0 
                    bg-gradient-to-tl from-white to-linearGradientStart 
                    p-3 text-black rounded-full cursor-pointer
                    text-sm lg:text-lg"
                        onClick={handleImgChange}>
                        <FaPen />
                    </div>
                )}
                <h2 className="text-[1.4rem] sm:text-[2rem] 
                lg:text-[2.4rem] font-bold">
                    {targetUser.username}
                </h2>
            </div>


            {/* Hidden file input */}
            {isCurrentUser && (
                <input type="file" className="hidden" ref={fileInputRef}
                    onChange={handleFileChange} />
            )}
        </div>
    );
};

export default ProfileImg;
