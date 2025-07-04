// src/components/VirtualTryOn.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import './VirtualTryOn.css';

function VirtualTryOn() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState('/clothes/tshirt1.png');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImageSrc(imgURL);
    }
  };

  useEffect(() => {
    if (!imageSrc) return;

    const runPoseDetection = async () => {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Wait for image to load
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Load detector
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
        const poses = await detector.estimatePoses(img);

        if (poses.length > 0) {
          const keypoints = poses[0].keypoints;

          const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');
          const rightShoulder = keypoints.find(p => p.name === 'right_shoulder');

          if (leftShoulder && rightShoulder) {
            const clothingImg = new Image();
            clothingImg.src = selectedClothing;

            clothingImg.onload = () => {
              const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
              const clothingWidth = shoulderWidth * 1.5;
              const clothingHeight = clothingWidth * 1.2;

              const x = leftShoulder.x - (shoulderWidth * 0.25);
              const y = leftShoulder.y;

              ctx.drawImage(clothingImg, x, y, clothingWidth, clothingHeight);
            };
          }
        }
      };
    };

    runPoseDetection();
  }, [imageSrc, selectedClothing]);

  return (
    <div className="tryon-container">
      <h2>🧍 Virtual Try-On</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div className="canvas">
        <canvas ref={canvasRef} />
        <img ref={imageRef} src={imageSrc} alt="Uploaded" style={{ display: 'none' }} />
      </div>

      <div className="controls">
        <button onClick={() => setSelectedClothing('/clothes/tshirt1.png')}>T-Shirt</button>
        <button onClick={() => setSelectedClothing('/clothes/frock1.png')}>Frock</button>
        <button onClick={() => setSelectedClothing('/clothes/pants1.png')}>Pants</button>
      </div>
    </div>
  );
}

export default VirtualTryOn;
