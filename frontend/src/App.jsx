import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState(null);

  // ✅ Receive image from webcam.html via postMessage
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
    const params = new URLSearchParams(window.location.search);
    const host = params.get("host");
    const webcamUrl = `/webcam${host ? `?host=${host}` : ''}`;
    window.open(webcamUrl, '_blank');
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
