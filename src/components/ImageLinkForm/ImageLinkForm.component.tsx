
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ImageLinkForm: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5 ">
        <p className=" pb-6 text-xl">{`This Magic Brain will detect faces in your pictures`}</p>

        <div className="flex flex-col items-center justify-center py-5 shadow-md px-5 w-[25rem] h-[15rem]">
            <Input placeholder="Input URL"></Input>
            <Button className=" mt-5">Detect</Button>
        </div>
    </div>
  )
};
