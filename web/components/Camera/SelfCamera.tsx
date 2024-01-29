import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import Video from "./Video";
import MicrophoneButton from "./Controlls/MicrophoneButton";
import VideoButton from "./Controlls/VideoButton";
import ConfigButton from "./Controlls/ConfigButton";
import ConfigModal from "../Modal/ConfigModal";
import { videoConstraints } from '@/utils/static';
import { useSetRecoilState } from 'recoil';
import { originalStreamState, localStreamState, screenStreamState } from '@/atoms/streamState';



interface Props {
  width: number;
  height: number;
  className: string;
  withControlls: boolean;
}

const SelfCamera = ({ width, height, withControlls, className }: Props) => {
  const configModalRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // TODO: add message when camera and microphone was rejected.
  const [isRejected, setIsRejected] = useState(false);
  const setOriginStream = useSetRecoilState(originalStreamState);
  const setLocalStream = useSetRecoilState(localStreamState);
  const setScreenStream = useSetRecoilState(screenStreamState);
  const videoStyle = {
    width: '100%',
    height: '100%',
    maxWidth: width,
    maxHeight: height,
  }

  const requestMediaStream = useCallback(async () => {
    if (!navigator.mediaDevices.getUserMedia || !videoRef.current) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      setOriginStream(mediaStream);
      const stream = new MediaStream(mediaStream);
      setLocalStream(stream);
      const screenStream = new MediaStream(stream);
      videoRef.current.srcObject = screenStream;
      setScreenStream(screenStream);
    } catch (e) {
      setIsRejected(false);
    }
  }, [setLocalStream, setOriginStream, setScreenStream]);

  useEffect(() => {
    requestMediaStream();
  }, [requestMediaStream])

  return (
    <div style={videoStyle} className={`relative overflow-hidden ${className}`}>
      <Video
        ref={videoRef}
        muted={true}
        className="card z-[-1] object-contain"
        // object-cover aspect-video
      />
      { withControlls && (
        <>
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
        </>
      )}
    </div>
  )
};

SelfCamera.defaultProps = {
  width: 0,
  height: 0,
  className: '',
  withControlls: false,
}

export default SelfCamera;
