import { localStreamState } from "@/atoms/streamState";
import { videoControlsState } from "@/atoms/videoControlsState";
import ToggleButton from "@/components/Button/ToggleButton";
import { useEffect, useState } from "react";
import { PiMicrophoneFill } from "react-icons/pi";
import { PiMicrophoneSlashFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";

interface Props {
  defaultState: boolean;
  className: string;
}

const MicrophoneButton = ({ className, defaultState }: Props) => {
  const localStream = useRecoilValue(localStreamState);
  const [videoControls, setVideoControls] = useRecoilState(videoControlsState)

  useEffect(() => {
    localStream?.getAudioTracks().forEach(track => {
      track.enabled = videoControls.microphone;
    })
  }, [localStream, videoControls])

  const toggleHandler = () => {
    setVideoControls({...videoControls, microphone: !videoControls.microphone})
  }

  return (
    <ToggleButton
      state={videoControls.microphone}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiMicrophoneFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiMicrophoneSlashFill}
      toggleFunction={toggleHandler}
      className={className}
    />
  )
}

MicrophoneButton.defaultProps = {
  defaultState: true,
  className: ''
}

export default MicrophoneButton;
