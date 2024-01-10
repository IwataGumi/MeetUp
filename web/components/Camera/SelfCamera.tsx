import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { defaultDevices } from "@/atoms/defaultDevices";
import Video from "./Video";
import MicrophoneButton from "./Controlls/MicrophoneButton";
import VideoButton from "./Controlls/VideoButton";
import ConfigButton from "./Controlls/ConfigButton";



interface Props {
  width: number;
  height: number;
}

const SelfCamera = ({width, height}: Props) => {
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
    <div className="relative overflow-hidden m-2">
      <Video
        ref={videoRef}
        width={width}
        height={height}
        className="card z-[-1] object-cover aspect-video"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute bottom-0 w-full flex m-2 items-center justify-center">
          <MicrophoneButton className="mx-2 btn-neutral" />
          <VideoButton className="mx-2" />
        </div>
        <div className="absolute top-0 right-0 p-2">
          <ConfigButton className="btn-neutral" />
        </div>
      </div>
    </div>
  )
}

SelfCamera.defaultProps = {
  width: 740,
  height: 416,
}

export default SelfCamera;
