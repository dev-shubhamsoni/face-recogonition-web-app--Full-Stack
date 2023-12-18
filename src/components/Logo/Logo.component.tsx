import { Tilt } from "@jdion/tilt-react";

export const Logo: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  return (
    <>
      <Tilt style={{ height: 250, width: 250 }} >
        {<div className=" bg-white h-[8rem] w-[8rem] ml-10 mt-5 rounded-lg 
        bg-gradient-to-r from-[#f3696e]  to-[#f7c2e6]">
        
        </div>}
        </Tilt>
    </>
  );
};
