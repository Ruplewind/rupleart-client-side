import React, { useState } from 'react';

const ImageZoom = ({ imageUrl }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '450px', height: '450px', zIndex: hovering ? 10 : 1, // Increase z-index on hover
        position: 'relative', // Set stacking context
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={imageUrl}
        className={`object-cover w-full h-full transition-transform duration-500 ease-in-out ${
          hovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          zIndex: hovering ? 10 : 1, // Ensure image stays within its boundaries
          position: 'relative',
        }}
        alt=""
      />
    </div>
  );
};

export default ImageZoom;
