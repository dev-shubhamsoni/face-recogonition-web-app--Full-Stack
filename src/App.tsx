import { Navigation } from "./components/Navigation/Navigation.component";
import { Logo } from "./components/Logo/Logo.component";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm.component";
import { Rank } from "./components/Rank/Rank.component";

import "./App.css";


const App = () => {
  return (
    <div className=" bg-gradient-to-r from-[#7c65a9]  to-[#96d4ca] w-full h-screen">
       <Navigation />
       <Logo />
       <div className=" -mt-[8rem] flex justify-center items-center flex-col">
       <Rank />
       <ImageLinkForm />

       </div>

       {/*
      
      <ImageLinkForm />
      <FaceRecogonition /> */}
    </div>
  )
};

export default App;
