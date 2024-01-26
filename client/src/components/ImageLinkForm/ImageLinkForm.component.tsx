import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageLinkFormProps {
  setInputImage: React.Dispatch<React.SetStateAction<string>>;
  inputImage: string;
  setUpClarify: () => void;
  setImageBoxDataPoints: (page: object) => void;
}

export const ImageLinkForm: React.FC<ImageLinkFormProps> = ({setImageBoxDataPoints, setInputImage, inputImage, setUpClarify}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageBoxDataPoints({});
    setInputImage(e.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <p className="pb-6 text-xl">{`This Magic Brain will detect faces in your pictures`}</p>

      <div className="form flex flex-col items-center justify-center align-middle gap-2 shadow-md px-10 rounded-3xl w-[80vw] h-[10rem]
      
      sm:flex-row
      md:w-[35rem] md:h-[10rem]
      ">
        <Input onChange={(e) => handleInputChange(e)} placeholder="Input URL" value={inputImage}></Input>
        <Button  disabled = {!inputImage.trim()} className="" onClick={() => setUpClarify()}>
          Detect
        </Button>
      </div>
    </div>
  );
};
