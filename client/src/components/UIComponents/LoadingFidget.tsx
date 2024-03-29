import React from "react"
import { PulseLoader } from "react-spinners"

const LoadingFidget: React.FC = () => {
    return (
        <div className="h-full w-full grid place-items-center text-white">
            <PulseLoader color="white" />
        </div>
    )
};

export default LoadingFidget;
