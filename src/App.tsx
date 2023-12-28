import { Navigation } from "./components/Navigation/Navigation.component";
import { Logo } from "./components/Logo/Logo.component";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm.component";
import { Rank } from "./components/Rank/Rank.component";
import { FaceRecogonitionBox } from "./components/FaceRecogonitionBox/FaceRecogonitionBox.component";
import { SignInForm } from "./components/Sign-in/Sign-in.component";
import { RegistrationForm } from "./components/Register/Register.component";

import "./App.css";
import { useState } from "react";

const App = () => {
  const [inputImage, setInputImage] = useState<string>("");
  const [imageBoxDataPoints, setImageBoxDataPoints] = useState<object>({});
  const [showSignIn, setShowSignIn] = useState<string>("signin");
  console.log(inputImage);

  const setUpClarify = () => {
    const image = document.getElementById("face-reco");
    const imageWidth = Number(image?.clientWidth);
    const imageHeight = Number(image?.clientHeight);
    gettingDataFromClarify(imageWidth, imageHeight);
  };

  const gettingDataFromClarify = (imageWidth: number, imageHeight: number) => {
    const PAT = "4fc8c81fe6d34137bea7a9164ddf1cd2";
    const USER_ID = "w2aje8i6qjze";
    const APP_ID = "SMART-brain";
    const MODEL_ID = "face-detection";
    const IMAGE_URL = inputImage;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
              // "base64": IMAGE_BYTES_STRING
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const regions = result.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(
              `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
            );

            gettingExactBoxDetails(
              imageWidth,
              imageHeight,
              topRow,
              leftCol,
              bottomRow,
              rightCol
            );
          });
        });
      })
      .catch((error) => console.log("error", error));
  };

  const gettingExactBoxDetails = (
    imageWidth: number,
    imageHeight: number,
    topRow: number,
    leftCol: number,
    bottomRow: number,
    rightCol: number
  ) => {
    const leftColData = leftCol * imageWidth;
    const topRowData = topRow * imageHeight;
    const rightColData = imageWidth - rightCol * imageWidth;
    const bottomRowData = imageHeight - bottomRow * imageHeight;

    const settingDetailsToBox = {
      bottomRow: bottomRowData,
      leftCol: leftColData,
      rightCol: rightColData,
      topRow: topRowData,
    };

    setImageBoxDataPoints(settingDetailsToBox);

    console.log(imageBoxDataPoints);
  };

  const handleSignIn = (username: string, password: string) => {
    // Your sign-in logic here
    console.log("Signing in with:", username, password);
    // Update state or perform other actions

    setShowSignIn("home");
  };

  const signOut = () => {
    setShowSignIn("signin");
  };

  const register = () => {
    setShowSignIn("register");
  };

  return (
    <div className=" bg-gradient-to-r from-[#7c65a9]  to-[#96d4ca] w-full min-h-screen">
      <Navigation signOut={signOut} />

      {showSignIn === "home" ? (
        <div>
        <Logo />

        <div className=" -mt-[12rem] flex justify-center items-center flex-col">
          <Rank />
          <ImageLinkForm
            setUpClarify={setUpClarify}
            setInputImage={setInputImage}
            inputImage={inputImage}
          />
        </div>

        <FaceRecogonitionBox
          imageBoxDataPoints={imageBoxDataPoints}
          inputImage={inputImage}
        />
      </div>
      ) : ( showSignIn === 'signin' ? <SignInForm onSignIn={handleSignIn} register={register} /> : <RegistrationForm />
        
      )}
    </div>
  );
};

export default App;
