import React, { SetStateAction, ChangeEvent, Dispatch } from "react"

const AllProfilesSearchBarInput: React.FC<{
    setSearchProfile: Dispatch<SetStateAction<string>>
}> = ({ setSearchProfile }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        setSearchProfile(searchValue)
    }

    return (
        <div className="flex flex-col items-center gap-7 w-full">
            <h2 data-testid="allProfiles-header"
                className="text-4xl">All profiles</h2>
            <input onChange={handleInputChange}
                className="px-5 py-3 w-[80%]
                sm:w-[30rem] text-black
                        focus:outline-none rounded-full"
                type="text" placeholder="Search for profiles..." />
        </div>
    )
};

export default AllProfilesSearchBarInput;
