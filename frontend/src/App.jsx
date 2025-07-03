import './App.css';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImageSrc(screenshot);
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

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <br />
      <button onClick={capturePhoto}>📸 Capture Photo</button>

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
