import { useState } from 'react';
import './App.css';

function App() {
  const [personImage, setPersonImage] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState('/clothes/tshirt1.png');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧥 Tryli - Virtual Try-On</h1>
      <p>Upload your photo and try on clothes before buying!</p>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />

      <div style={{ position: 'relative', width: '300px', height: '400px', margin: '0 auto', border: '1px solid #ccc' }}>
        {personImage && (
          <>
            <img src={personImage} alt="User" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
            <img src={selectedClothing} alt="Clothing" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', opacity: 0.9 }} />
          </>
        )}
      </div>

      <br />
      <div>
        <p>Choose Clothing:</p>
        <button onClick={() => setSelectedClothing('/clothes/tshirt1.png')}>T-Shirt</button>
        <button onClick={() => setSelectedClothing('/clothes/pants1.png')}>Pants</button>
        <button onClick={() => setSelectedClothing('/clothes/frock1.png')}>Frock</button>
      </div>
    </div>
  );
}

export default App;
