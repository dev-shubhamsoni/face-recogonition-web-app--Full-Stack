import { Tilt } from "@jdion/tilt-react";
import BrainLogo from '../../assets/icons8-brain-100.png'


export const LogoComponent: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  return (
    <>
      <Tilt style={{ height: 250, width: 250 }}>
        <div className=" p-4 flex justify-center align-middle bg-white h-[6rem] w-[6rem] ml-7 -mt-4 mb-4 rounded-lg bg-gradient-to-r from-[#f3696e] to-[#f7c2e6]
        
        md:ml-10 md:mt-5 md:p-5
        lg:w-[8rem] lg:h-[8rem]
        ">
          <img src={BrainLogo} alt="Brain Logo" />
        </div>
      </Tilt>
    </>
  );
};
