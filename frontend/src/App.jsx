import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [bodyImage, setBodyImage] = useState(null);

  // Handle messages from webcam window
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

  const handleBodyImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBodyImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧥 Tryli - Virtual Try-On</h1>
      <p>Upload your photo or capture one using your webcam!</p>

      {/* 👤 Face upload */}
      <form>
        <input type="file" accept="image/*" />
        <br /><br />
        <button type="submit">Try On</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      {/* 📷 Webcam capture */}
      <button onClick={openCamera}>📸 Open Webcam in New Tab</button>

      {/* 👤 Body upload */}
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="bodyUpload" style={{ display: 'inline-block', marginTop: '1rem' }}>
          <strong>👤 Upload Your Body Photo</strong>
        </label>
        <br />
        <input
          id="bodyUpload"
          type="file"
          accept="image/*"
          onChange={handleBodyImageUpload}
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      {/* 📸 Webcam preview */}
      {imageSrc && (
        <>
          <h3>📸 Captured Preview:</h3>
          <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}

      {/* 👤 Body preview */}
      {bodyImage && (
        <>
          <h3>👤 Body Photo Preview:</h3>
          <img src={bodyImage} alt="Body" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}
    </div>
  );
}

export default App;
