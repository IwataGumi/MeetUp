import React from "react";
import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { defaultDevices } from "@/atoms/defaultDevices";
import Video from "./Video";
import MicrophoneButton from "./Controlls/MicrophoneButton";
import VideoButton from "./Controlls/VideoButton";
import ConfigButton from "./Controlls/ConfigButton";
import ConfigModal from "../Modal/ConfigModal";
import { userState } from "@/atoms/userState";




interface Props {
  width: number;
  height: number;
}

const SelfCamera = React.forwardRef<HTMLVideoElement, Props>(({ width, height }, ref) => {
  const configModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative overflow-hidden">
      <Video
        ref={ref}
        muted={true}
        width={width}
        height={height}
        className="card z-[-1] object-cover aspect-video"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute bottom-0 w-full flex my-3 items-center justify-center">
          <MicrophoneButton className="mx-1" />
          <VideoButton className="mx-1" />
        </div>
        <div className="absolute top-0 right-0 p-2">
          <ConfigButton
            className="btn-neutral"
            onClick={() => configModalRef.current?.showModal()}
          />
        </div>
      </div>
      <ConfigModal ref={configModalRef} />
    </div>
  )
});

SelfCamera.displayName = 'SelfCamera';
SelfCamera.defaultProps = {
  width: 740,
  height: 416,
}

export default SelfCamera;
