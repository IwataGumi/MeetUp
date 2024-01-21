import { localStreamState } from "@/atoms/streamState";
import { videoControlsState } from "@/atoms/videoControlsState";
import ToggleButton from "@/components/Button/ToggleButton";
import { useEffect, useState } from "react";
import { PiVideoCameraFill } from "react-icons/pi";
import { PiVideoCameraSlashFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";

interface Props {
  defaultState: boolean;
  className: string;
}

const VideoButton = ({ className, defaultState }: Props) => {
  const localStream = useRecoilValue(localStreamState);
  const [videoControls, setVideoControls] = useRecoilState(videoControlsState)

  useEffect(() => {
    localStream?.getVideoTracks().forEach(track => {
      track.enabled = videoControls.camera
    }, [localStream, videoControlsState])
  })

  if (!localStream) return;

  const toggleHandler = () => {
    setVideoControls({...videoControls, camera: !videoControls.camera})
  }

  return (
    <ToggleButton
      state={videoControls.camera}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiVideoCameraFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiVideoCameraSlashFill}
      toggleFunction={toggleHandler}
      className={className}
    />
  )
}

VideoButton.defaultProps = {
  defaultState: true,
  className: ''
}

export default VideoButton;
