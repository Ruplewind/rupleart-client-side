import React from "react";

const DownloadApk = () => {
  const apkUrl = "https://expo.dev/artifacts/eas/jPe1oar6TYWRpAYPdVwKe.apk";

  return (
    <div className="min-h-screen bg-gray-300 p-6">
        <div className="flex gap-0 lg:gap-5 justify-center">
            <div className="w-44 lg:h-96">
                <img src={require('../images/appimages/Splash screen.jpeg')} />
            </div>
            <div className="w-0 lg:w-44 h-0 lg:h-96 collapse lg:visible">
                <img src={require('../images/appimages/Login Page.jpeg')}  />
            </div>
            <div className="w-0 lg:w-44 h-0 lg:h-96 collapse lg:visible">
                <img src={require('../images/appimages/Homepage.jpeg')}  />
            </div>
        </div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 mt-10 text-center">Download Rupleart Android App</h1>
      <p className="text-base lg:text-lg text-gray-700 mb-6 text-center">Click the button below to download the latest version of the Rupleart android app.</p>
        <div className="flex justify-center">
            <a
                href={apkUrl}
                download
                className="bg-purple-900 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition-all"
            >
                Download APK
            </a>
        </div>
      
    </div>
  );
};

export default DownloadApk;
