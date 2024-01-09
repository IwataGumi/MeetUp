import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { defaultDevices } from "@/atoms/defaultDevices";

const SelfCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const devices = useRecoilValue(defaultDevices);
 
  useEffect(() => {
    console.log(devices, "recoil")
    if (videoRef) {
      navigator.mediaDevices
        .getUserMedia({
          video: devices.camera,
          audio: devices.microphone,
        })
        .then((stream) => {
          if (videoRef?.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [devices, videoRef])

  return (
    <div className="relative overflow-hidden">
      <video
        autoPlay
        playsInline
        ref={videoRef}
        className="card z-[-1] w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <h1>Test</h1>
      </div>
    </div>
  )
}

export default SelfCamera;
