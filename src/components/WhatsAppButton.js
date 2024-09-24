import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function WhatsAppButton() {
  const phoneNumber = '+254707357072';
  const message = 'Hello! I would like to get more information on Ruple Art platform.';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed bottom-8 left-6 z-50 flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Pulsating Circle */}
      <div className="absolute bg-green-500 opacity-75 w-16 h-16 rounded-full animate-ping duration-[5s]"></div>

      {/* WhatsApp Button */}
      <div
        className="relative bg-green-500 rounded-full p-3 shadow-lg cursor-pointer hover:bg-green-600 transition duration-1000"
      >
        <WhatsAppIcon style={{ color: 'white', fontSize: '2rem' }} />
      </div>
    </div>
  );
}

export default WhatsAppButton;
