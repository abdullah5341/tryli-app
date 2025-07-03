import React, { useState } from 'react';
import './VirtualTryOn.css';

function VirtualTryOn() {
  const [personImage, setPersonImage] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState('/clothes/tshirt1.png');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="tryon-container">
      <h2>🧍 Virtual Try-On</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      <div className="canvas">
        {personImage && <img src={personImage} alt="User" className="person-img" />}
        {personImage && <img src={selectedClothing} alt="Clothing" className="clothing-overlay" />}
      </div>

      <div className="controls">
        <button onClick={() => setSelectedClothing('/clothes/tshirt1.png')}>T-Shirt</button>
        <button onClick={() => setSelectedClothing('/clothes/frock1.png')}>Frock</button>
        <button onClick={() => setSelectedClothing('/clothes/pants1.png')}>Pants</button>
      </div>
    </div>
  );
}

export default VirtualTryOn;
