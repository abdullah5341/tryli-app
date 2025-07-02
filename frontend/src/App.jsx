import './App.css'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧥 Tryli – Virtual Try-On</h1>
      <p>Upload your photo and try on clothes virtually!</p>

      {/* Upload UI will go here */}
      <input type="file" accept="image/*" />
    </div>
  );
}

export default App;
