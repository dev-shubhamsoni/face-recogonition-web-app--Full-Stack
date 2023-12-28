import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageLinkFormProps {
  setInputImage: React.Dispatch<React.SetStateAction<string>>;
  inputImage: string;
  setUpClarify: () => void;
}

export const ImageLinkForm: React.FC<ImageLinkFormProps> = ({ setInputImage, inputImage, setUpClarify}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputImage(e.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <p className="pb-6 text-xl">{`This Magic Brain will detect faces in your pictures`}</p>

      <div className="flex flex-col items-center justify-center py-5 shadow-md px-5 w-[25rem] h-[15rem]">
        <Input onChange={handleInputChange} placeholder="Input URL" value={inputImage}></Input>
        <Button disabled = {!inputImage.trim()} className="mt-5" onClick={() => setUpClarify()}>
          Detect
        </Button>
      </div>
    </div>
  );
};
