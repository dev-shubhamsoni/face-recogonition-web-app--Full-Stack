import { Tilt } from "@jdion/tilt-react";
import BrainLogo from '../../assets/icons8-brain-100.png'


export const LogoComponent: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  return (
    <>
      <Tilt style={{ height: 250, width: 250 }}>
        <div className=" p-5 flex justify-center align-middle bg-white h-[8rem] w-[8rem] ml-10 mt-5 rounded-lg bg-gradient-to-r from-[#f3696e] to-[#f7c2e6]">
          <img src={BrainLogo} alt="Brain Logo" />
        </div>
      </Tilt>
    </>
  );
};
