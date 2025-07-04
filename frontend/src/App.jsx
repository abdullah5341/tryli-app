import React, { useEffect, useState } from 'react';
import './App.css';
import VirtualTryOn from './components/VirtualTryOn'; // Optional if embedding

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [bodyImage, setBodyImage] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin.startsWith("https://tryli-app-production.up.railway.app") &&
        event.data.image
      ) {
        setImageSrc(event.data.image);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const openCamera = () => {
    window.open('/webcam', '_blank');
  };

  const openGuidedWebcam = () => {
    const params = new URLSearchParams(window.location.search);
    const host = params.get("host") || "";
    window.open(`/guided-webcam?host=${host}`, '_blank');
  };

  const handleBodyImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBodyImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="app-container">
      <h1>🧥 Tryli - Virtual Try-On</h1>
      <p>Upload your photo or capture one using your webcam!</p>

      {/* Upload face image */}
      <form>
        <input type="file" accept="image/*" />
        <br /><br />
        <button type="submit">Try On</button>
      </form>

      <hr className="divider" />

      {/* Webcam button */}
      <button className="primary-btn" onClick={openCamera}>
        📸 Open Webcam in New Tab
      </button>

      {/* Upload body image */}
      <div className="body-upload">
        <label htmlFor="bodyUpload"><strong>👤 Upload Your Body Photo</strong></label>
        <br />
        <input
          id="bodyUpload"
          type="file"
          accept="image/*"
          onChange={handleBodyImageUpload}
        />
      </div>

      {/* Previews */}
      {imageSrc && (
        <>
          <h3>📸 Captured Preview:</h3>
          <img src={imageSrc} alt="Captured" className="preview-img" />
        </>
      )}
      {bodyImage && (
        <>
          <h3>👤 Body Photo Preview:</h3>
          <img src={bodyImage} alt="Body" className="preview-img" />
        </>
      )}

      <hr className="divider" />

      {/* Try-On & Guided Webcam */}
      <button className="secondary-btn" onClick={() => window.open('/tryon', '_blank')}>
        🧍 Try Virtual Clothes On Body Photo
      </button>

      <button className="secondary-btn" onClick={openGuidedWebcam}>
        🎯 Open Guided Webcam
      </button>

      {/* Optional: Embed try-on */}
      {/* <VirtualTryOn /> */}
    </div>
  );
}

export default App;
