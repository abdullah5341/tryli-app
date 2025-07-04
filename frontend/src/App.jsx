import React, { useEffect, useState } from 'react';
import './App.css';
import VirtualTryOn from './components/VirtualTryOn'; // ✅ Keep this if you plan to embed it directly

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

      <form>
        <input type="file" accept="image/*" />
        <br /><br />
        <button type="submit">Try On</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <button onClick={openCamera}>📸 Open Webcam in New Tab</button>

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="bodyUpload"><strong>👤 Upload Your Body Photo</strong></label>
        <br />
        <input
          id="bodyUpload"
          type="file"
          accept="image/*"
          onChange={handleBodyImageUpload}
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      {imageSrc && (
        <>
          <h3>📸 Captured Preview:</h3>
          <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}

      {bodyImage && (
        <>
          <h3>👤 Body Photo Preview:</h3>
          <img src={bodyImage} alt="Body" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}

      <hr style={{ margin: '2rem 0' }} />

      {/* ✅ Opens TryOn page in new tab */}
      <button onClick={() => window.open('/tryon', '_blank')}>
        🧍 Try Virtual Clothes On Body Photo
      </button>

      {/* Optional embedded mode */}
      {/* <VirtualTryOn /> */}
    </div>
  );
}

export default App;
