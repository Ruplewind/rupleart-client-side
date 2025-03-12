import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadApk = () => {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.rupleartapp.app";
  const appStoreUrl = "#"; // Placeholder for App Store link

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="flex gap-0 lg:gap-5 justify-center">
        <div className="w-0 lg:w-44 h-0 lg:h-96 collapse lg:visible">
          <img src={require("../images/appimages/Splash screen.jpeg")} alt="Splash Screen" />
        </div>
        <div className="w-0 lg:w-44 h-0 lg:h-96 collapse lg:visible">
          <img src={require("../images/appimages/Login Page.jpeg")} alt="Login Page" />
        </div>
        <div className="w-44 h-56 lg:h-96 flex justify-center">
          <img src={require("../images/appimages/Homepage.jpeg")} className="h-56 lg:h-96 object-contain" alt="Homepage" />
        </div>
      </div>
      <h1 className="text-2xl lg:text-xl font-bold mb-4 mt-10 text-center">Download Rupleart Mobile App</h1>
      <p className="text-base lg:text-lg text-gray-700 mb-6 text-center">
        Click the button below to download the latest version of the Rupleart mobile app from the official stores.
      </p>
      <div className="block lg:flex justify-center gap-4">
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center lg:justify-start gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-green-500 transition-all mb-2"
        >
          <FaGooglePlay size={24} /> Google Play
        </a>
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center lg:justify-start gap-2 bg-black text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800 transition-all mb-2"
        >
          <FaApple size={24} /> App Store
        </a>
      </div>
    </div>
  );
};

export default DownloadApk;
