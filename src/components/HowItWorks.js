import React from 'react';

const HowItWorks = () => {
  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-md lg:text-2xl font-bold">How It Works</h1>
            </div>
        </div>
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg mt-5 mb-10 text-sm">

      <div className="mb-8">
        <h2 className="text-md font-semibold mb-4">For Artists:</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Create an Account:</strong> Sign up for free and create your artist profile. Personalize your 
            profile with a bio and pictures to share your artistic journey.
          </li>
          <li>
            <strong>Upload Your Artwork:</strong> List your original artwork by uploading high-quality images, 
            adding descriptions, and setting prices in Kenyan Shillings (KES).
          </li>
          <li>
            <strong>Sell and Ship:</strong> Once a buyer purchases your work, you’ll receive an order notification. 
            Package the artwork securely and ship it to the buyer. After the buyer confirms receipt, 
            you'll receive your payment.
          </li>
          <li>
            <strong>Get Paid:</strong> Payments are securely processed and transferred to your account via mobile 
            money (e.g., M-Pesa), PayPal or bank transfer.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-md font-semibold mb-4">For Buyers:</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Browse and Discover:</strong> Explore a wide range of original artworks by talented artists from 
            around the world. Use filters to find pieces that match your style.
          </li>
          <li>
            <strong>Purchase with Confidence:</strong> Select the artwork you love, and complete the payment 
            using our secure system. All payments are processed in Kenyan Shillings.
          </li>
          <li>
            <strong>Receive Your Artwork:</strong> Once your order is processed, the artist will ship the artwork to 
            you. You’ll receive tracking information to keep an eye on delivery.
          </li>
          <li>
            <strong>Enjoy Your Piece:</strong> Once your artwork arrives, it’s yours to enjoy! Every piece comes 
            directly from the artist, ensuring authenticity and originality.
          </li>
        </ol>
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;
