import React, { useState } from 'react';
import './VirtualTryOn.css'; // ✅ Make sure this file exists

function TryOnPage() {
  const [bodyImage, setBodyImage] = useState(null);
  const [clothingImage, setClothingImage] = useState('/clothes/tshirt1.png');

  const handleBodyUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBodyImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="tryon-container">
      <h1>👕 Tryli - Try Clothes On Your Body Photo</h1>

      <input type="file" accept="image/*" onChange={handleBodyUpload} />
      <br /><br />

      <div className="canvas">
        {bodyImage && <img src={bodyImage} alt="User" className="person-img" />}
        {bodyImage && <img src={clothingImage} alt="Clothing" className="clothing-overlay" />}
      </div>

      <div className="controls">
        <button onClick={() => setClothingImage('/clothes/tshirt1.png')}>T-Shirt</button>
        <button onClick={() => setClothingImage('/clothes/frock1.png')}>Frock</button>
        <button onClick={() => setClothingImage('/clothes/pants1.png')}>Pants</button>
      </div>
    </div>
  );
}

export default TryOnPage;
