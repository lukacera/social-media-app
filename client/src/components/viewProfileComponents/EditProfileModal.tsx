import React, { useState, useEffect, useContext } from "react"
import { editProfile } from "../../api/editProfileDataAPIs/editProfileApi";
import { UserContext } from "../../hooks/UserContextHook";

const EditProfileModal: React.FC<{
    isEditOpen: boolean,
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isEditOpen, closeModal }) => {
    const { currentUserData, setCurrentUserData } = useContext(UserContext)
    // Set initial state for update to be current User data
    const [update, setUpdate] = useState({
        name: currentUserData.name,
        surname: currentUserData.surname,
        age: currentUserData.age
    });

    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const fetched_data = await editProfile(currentUserData.username, update);
            setCurrentUserData(prevData => ({
                ...prevData,
                ...update
            }))
            if (typeof (fetched_data) === "string") {
                setErrorMessage(fetched_data)
                return
            }
            closeModal(false)
        } catch (error) {
            console.error("Error occured while trying to update User " + error)
        }
    }
    // Set targetUser on render
    useEffect(() => {
        if (currentUserData) {
            setUpdate({
                name: currentUserData.name,
                surname: currentUserData.surname,
                age: currentUserData.age
            });
        }
    }, [currentUserData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdate((prevUpdate) => ({
            ...prevUpdate,
            [name]: value
        }))
    }
    return !isEditOpen ? null : (
        <div className="flex flex-col items-center bg-profileColor
            fixed  top-[10rem] rounded-lg inset-x-0 mx-auto
            w-[90%] max-w-[40rem]">
            <span className="cursor-pointer text-[1.6rem] flex justify-end w-full
            p-5"
                onClick={() => closeModal(false)}>
                x
            </span>
            <form className="grid place-items-center gap-5 px-20 pb-10"
                encType="multipart/form-data" onSubmit={handleSubmit}>
                <h3 className="text-2xl tracking-wide">Edit your profile:</h3>
                <div className="flex flex-col">
                    <label className="mt-4 mb-2" htmlFor="name">Name:</label>
                    <input id="name" name="name" className="editProfileInput" type="text"
                        value={update.name} onChange={handleChange}
                        spellCheck="false" />

                    <label className="mt-4 mb-2" htmlFor="surname">Surname:</label>
                    <input id="surname" name="surname" className="editProfileInput" type="text"
                        value={update.surname} onChange={handleChange}
                        spellCheck="false" />

                    <label className="mt-4 mb-2" htmlFor="age">Age:</label>
                    <input id="age" name="age" className="editProfileInput" type="number"
                        value={update.age} onChange={handleChange} />

                    <p>{errorMessage}</p>
                </div>
                <button className="px-5 py-2 bg-white text-black 
                    rounded-lg mt-5 border-2">
                    Confirm edit
                </button>
            </form>
        </div>
    )
};

export default EditProfileModal;
