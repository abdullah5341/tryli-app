import React, { useEffect, useState } from 'react';
import './App.css';
import VirtualTryOn from './components/VirtualTryOn'; // Optional if embedding directly

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

  const openGuidedWebcam = () => {
    const params = new URLSearchParams(window.location.search);
    const host = params.get("host") || "";
    window.open(`/guided-webcam?host=${host}`, '_blank');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧥 Tryli - Virtual Try-On</h1>
      <p>Upload your photo or capture one using your webcam!</p>

      {/* Upload for face photo */}
      <form>
        <input type="file" accept="image/*" />
        <br /><br />
        <button type="submit">Try On</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <button onClick={openCamera}>📸 Open Webcam in New Tab</button>

      {/* Upload body photo */}
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

      {/* ✅ Link to overlay clothing on uploaded body image */}
      <button onClick={() => window.open('/tryon', '_blank')}>
        🧍 Try Virtual Clothes On Body Photo
      </button>

      {/* ✅ Link to guided webcam with host param */}
      <button onClick={openGuidedWebcam}>
        🎯 Open Guided Webcam
      </button>

      {/* Optional: Uncomment to embed try-on directly */}
      {/* <VirtualTryOn /> */}
    </div>
  );
}

export default App;
