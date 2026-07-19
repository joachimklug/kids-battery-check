export const isFaceDetectionSupported = () => typeof window !== 'undefined' && 'FaceDetector' in window;

export const createFaceDetector = () => {
  if (!isFaceDetectionSupported()) return null;
  try {
    return new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
  } catch {
    return null;
  }
};

export const detectFace = async (detector, videoElement) => {
  if (!detector || !videoElement || videoElement.readyState < 2) return false;
  try {
    const faces = await detector.detect(videoElement);
    return faces.length > 0;
  } catch {
    return false;
  }
};
