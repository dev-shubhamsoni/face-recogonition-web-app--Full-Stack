import React from 'react';

interface FaceRecogo {
  inputImage: string;
  imageBoxDataPoints: {
    bottomRow: number;
    leftCol: number;
    rightCol: number;
    topRow: number;
  };
}

export const FaceRecogonitionBox: React.FC<FaceRecogo> = ({
  inputImage,
  imageBoxDataPoints,
}) => {
  
  return (
    <div className="flex justify-center">
      {inputImage && (
        <div className="relative">
          <img
            id="face-reco"
            alt="face-detection-image"
            src={inputImage}
            width="500px"
            height="auto"
          />
          <div
            className={`absolute border-4 cursor-pointer`}
            style={{
              top: `${imageBoxDataPoints.topRow}px`,
              left: `${imageBoxDataPoints.leftCol}px`,
              right: `${imageBoxDataPoints.rightCol}px`,
              bottom: `${imageBoxDataPoints.bottomRow}px`,
            }}
          >
            
          </div>
        </div>
      )}
    </div>
  );
};
