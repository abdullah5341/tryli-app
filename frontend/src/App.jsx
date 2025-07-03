import React, { useEffect, useState } from 'react';
import './App.css';

<a href="/capture" target="_blank" rel="noopener noreferrer">
  <button type="button">📷 Open Webcam Capture</button>
</a>


function App() {
  const [imageSrc, setImageSrc] = useState(null);

  // ✅ Listen for messages from capture.html
  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.image) {
        setImageSrc(event.data.image);
      }
    });
  }, []);

  const openCamera = () => {
    window.open('/capture', '_blank');
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
          <h3>Preview:</h3>
          <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '1rem' }} />
        </>
      )}
    </div>
  );
}

export default App;
