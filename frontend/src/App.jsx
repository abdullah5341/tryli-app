import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // ✅ Accept messages only from trusted domain
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
    window.open('/webcam', '_blank'); // ✅ Opens external webcam capture
  };

  const openUploadPage = () => {
    window.open('/upload', '_blank'); // ✅ Opens your custom upload page
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧥 Tryli - Virtual Try-On</h1>
      <p>Upload your photo or capture one using your webcam!</p>

      {/* ✅ File Upload Form */}
      <form>
        <input type="file" accept="image/*" />
        <br /><br />
        <button type="submit">Try On</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      {/* ✅ Webcam capture */}
      <button onClick={openCamera}>📸 Open Webcam in New Tab</button>
      &nbsp;&nbsp;
      {/* ✅ Upload user body photo */}
      <button onClick={openUploadPage}>👤 Upload Your Body Photo</button>

      {imageSrc && (
        <>
          <h3>📸 Captured Preview:</h3>
          <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}
    </div>
  );
}

export default App;
