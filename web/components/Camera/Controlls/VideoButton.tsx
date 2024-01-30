import { localStreamState } from "@/atoms/streamState";
import { muteControlsState } from "@/atoms/muteControlsState";
import ToggleButton from "@/components/Button/ToggleButton";
import { useEffect, useState } from "react";
import { PiVideoCameraFill } from "react-icons/pi";
import { PiVideoCameraSlashFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultButtonSize, defaultButtonSizeClass } from "@/utils/static";

interface Props {
  iconSize: number;
  className: string;
  buttonSizeClassName: string;
}

const VideoButton = ({ iconSize, className, buttonSizeClassName }: Props) => {
  const localStream = useRecoilValue(localStreamState);
  const [videoControls, setVideoControls] = useRecoilState(muteControlsState)

  useEffect(() => {
    localStream?.getVideoTracks().forEach(track => {
      track.enabled = videoControls.camera
    }, [localStream, muteControlsState])
  })

  if (!localStream) return;

  const toggleHandler = () => {
    setVideoControls({...videoControls, camera: !videoControls.camera})
  }

  return (
    <ToggleButton
      iconSize={iconSize}
      state={videoControls.camera}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiVideoCameraFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiVideoCameraSlashFill}
      buttonSizeClassName={buttonSizeClassName}
      toggleFunction={toggleHandler}
      className={className}
    />
  )
}

VideoButton.defaultProps = {
  iconSize: defaultButtonSize,
  className: '',
  buttonSizeClassName: defaultButtonSizeClass,
}

export default VideoButton;
