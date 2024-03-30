import React, { useEffect, useState } from "react";
import { useTransition } from "react-transition-state";

const GreenMessage: React.FC<{ text: string }> = ({ text }) => {

  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Setting visibility...")
      setVisible(false);
    }, 3000); // Change the duration as per your requirement
    console.log("Visibility set!")
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const transitions = useTransition({
    onStateChange: {

    }
  });
  return (
    <>
      {visible && (
        <div
          className="absolute top-10 w-full bg-transparent flex 
          justify-center bg-backgroundDark z-10">

          <div className="py-6 px-10 bg-white flex 
          justify-center">
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GreenMessage;
