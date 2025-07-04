// frontend/src/pages/GuidedWebcam.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Page, Layout, Card, Button, Text } from '@shopify/polaris';

function GuidedWebcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    const constraints = { video: { width: 400, height: 500 } };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 400, 500);

    const imageData = canvasRef.current.toDataURL('image/jpeg');
    window.opener?.postMessage({ image: imageData }, "*");
    setIsCaptured(true);
  };

  return (
    <Page title="📸 Guided Webcam Capture">
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <Text variant="headingMd">Align Your Face or Body Inside the Box</Text>
              <p>Zoom in/out if needed until you fit inside the frame.</p>

              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '500px',
                  margin: '1rem auto',
                  border: '2px solid #008060',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={videoRef}
                  width="400"
                  height="500"
                  autoPlay
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '80%',
                    height: '60%',
                    border: '3px dashed red',
                    borderRadius: '10px',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              <Button primary onClick={capture}>
                Capture Image
              </Button>

              {isCaptured && <p style={{ marginTop: '1rem', color: 'green' }}>✅ Image captured and sent!</p>}
              <canvas ref={canvasRef} width="400" height="500" style={{ display: 'none' }} />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default GuidedWebcam;
