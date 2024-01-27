import { Navigation } from "./components/Navigation/Navigation.component";
import { LogoComponent } from "./components/Logo/Logo.component";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm.component";
import { Rank } from "./components/Rank/Rank.component";
import { FaceRecogonitionBox } from "./components/FaceRecogonitionBox/FaceRecogonitionBox.component";
import { SignInForm } from "./components/Sign-in/Sign-in.component";
import { RegistrationForm } from "./components/Register/Register.component";

import "./App.css";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  entries: number;
  joined: Date;
}

const App = () => {
  const [inputImage, setInputImage] = useState<string>("");
  const [imageBoxDataPoints, setImageBoxDataPoints] = useState<object>({});
  const [showSignIn, setShowSignIn] = useState<string>("signin");
  const [totalRank, setTotalRank] = useState<number>(0);

  const [idForLoggedInUser, setIdForLoggedInUser] = useState<number>(0);

  const [userProfile, setuserProfile] = useState<User | null>(null);

  const [areaVisible, setAreaVisible] = useState<boolean>(false);
  const [showSignInArea, setShowSignInArea] = useState<boolean>(false);

  const loadUser = (user: User) => {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    };

    setuserProfile(userData);
  };

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
    fetchingCount();
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
  };

  const fetchingCount = async () => {
    

    try {
      const response = await fetch("api/v1/image", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: idForLoggedInUser,
        }),
      });

      const count = await response.json();
      setTotalRank(count);
      setAreaVisible(true);
    } catch (error) {
      console.error("Error during fetchingCount:", error);
    }
  };

  const signOut = () => {
    setShowSignIn("signin");
    setAreaVisible(false);
    setShowSignInArea(false);
  };
  
  const register = () => {
    setShowSignIn("register");
  };

  return (
    <div className=" bg-gradient-to-r from-[#7c65a9]  to-[#96d4ca] w-full min-h-screen ">
      {showSignInArea && <Navigation signOut={signOut} />}

      {showSignIn === "home" ? (
        <div>
          <LogoComponent />

          <div className=" -mt-[8rem] flex justify-center items-center flex-col
          
          md:-mt-[12rem]
          ">
            {areaVisible && <Rank totalRank={totalRank} />}

            <ImageLinkForm
              setUpClarify={setUpClarify}
              setInputImage={setInputImage}
              inputImage={inputImage}
              setImageBoxDataPoints={setImageBoxDataPoints}
            />
          </div>

          <FaceRecogonitionBox
            imageBoxDataPoints={imageBoxDataPoints}
            inputImage={inputImage}
          />
        </div>
      ) : showSignIn === "signin" ? (
        <SignInForm
          setShowSignIn={setShowSignIn}
          register={register}
          setIdForLoggedInUser={setIdForLoggedInUser}
          setInputImage={setInputImage}
          setShowSignInArea = {setShowSignInArea}
        />
      ) : (
        <RegistrationForm
          setShowSignIn={setShowSignIn}
          loadUser={loadUser}
          setIdForLoggedInUser={setIdForLoggedInUser}
          setInputImage={setInputImage}
          setAreaVisible={setAreaVisible}
          setShowSignInArea = {setShowSignInArea}
        />
      )}
    </div>
  );
};

export default App;
