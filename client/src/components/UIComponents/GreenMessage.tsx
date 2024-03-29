import React from "react";

const GreenMessage: React.FC<{ text: string }> = ({ text }) => {

  return (
    <div className="py-10 w-[20rem] h-screen bg-green-400 absolute top-10">
      <p>{text}</p>
    </div>
  );
};

export default GreenMessage;