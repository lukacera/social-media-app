import React, { useContext, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getImgURL } from "../../constants/imgURL";
import { editProfileImg } from "../../api/editProfileDataAPIs/editProfileImgApi";
import { UserContext } from "../../hooks/UserContextHook";
const ProfileImg: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | undefined>(undefined);
    const { targetUser, isCurrentUser } = useContext(UserContext)
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
        <div className="flex flex-col place-items-center gap-10 w-[70%] mx-auto">
            <div className="relative">
                {image ? (
                    <img className="w-[25em] h-[22rem] rounded-full"
                        src={image} alt="User picture" />
                ) : (
                    <img className="w-[25em] h-[22rem] rounded-full"
                        src={getImgURL(targetUser.avatar || "")} alt="User picture" />
                )}
                {isCurrentUser && (
                    <div className="absolute right-0 bottom-0 
                    bg-gradient-to-tl from-white to-linearGradientStart 
                    p-3 text-black rounded-full cursor-pointer"
                        onClick={handleImgChange}>
                        <FaPen />
                    </div>
                )}
            </div>

            <h2 className="text-[2.4rem] font-bold">{targetUser.username}</h2>

            {/* Hidden file input */}
            {isCurrentUser && (
                <input type="file" className="hidden" ref={fileInputRef}
                    onChange={handleFileChange} />
            )}
        </div>
    );
};

export default ProfileImg;
