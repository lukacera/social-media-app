import React, { useState, useEffect, useContext } from "react"
import { editProfile } from "../../api/editProfileDataAPIs/editProfileApi";
import { UserContext } from "../../hooks/UserContextHook";
const EditProfileModal: React.FC<{
    isEditOpen: boolean,
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isEditOpen, closeModal }) => {
    const { targetUser, setTargetUser } = useContext(UserContext)
    // Set initial state for update to be current User data
    const [update, setUpdate] = useState({
        name: targetUser.name,
        surname: targetUser.surname,
        age: targetUser.age
    });

    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const fetched_data = await editProfile(targetUser.username, update);
            setTargetUser(prevData => ({
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
        if (targetUser) {
            setUpdate({
                name: targetUser.name,
                surname: targetUser.surname,
                age: targetUser.age
            });
        }
    }, [targetUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdate((prevUpdate) => ({
            ...prevUpdate,
            [name]: value
        }))
    }
    return !isEditOpen ? null : (
        <div className="flex flex-col bg-profileColor
            fixed left-[33%] top-[28%] rounded-lg">
            <p className=" flex justify-end p-5">
                <span className="cursor-pointer text-[1.6rem]"
                    onClick={() => closeModal(false)}>
                    x
                </span>
            </p>
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
