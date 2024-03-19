import React from "react"
import { userType } from "../../../server/types/userType";

const EditProfileModal: React.FC<{
    isEditOpen: boolean,
    userData: userType,
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}> =
    ({ isEditOpen, userData, closeModal }) => {
        return !isEditOpen ? null : (
            <div className="flex flex-col bg-green-500
            fixed left-[35%] top-[40%]">
                <p className=" flex justify-end p-5">
                    <span className="cursor-pointer text-[1.6rem]"
                        onClick={() => closeModal(false)}>
                        x
                    </span>
                </p>
                <div className="grid place-items-center 
                gap-5 px-10 py-5 text-black">
                    <h3>Edit your profile:</h3>
                    <div className="flex flex-col gap-3">
                        <input className="editProfileInput" type="text" value={userData.username} />
                        <input className="editProfileInput" type="text" value={userData.name} />
                        <input className="editProfileInput" type="text" value={userData.surname} />
                        <input className="editProfileInput" type="number" value={userData.age} />
                    </div>
                </div>
            </div>
        )
    };

export default EditProfileModal;
