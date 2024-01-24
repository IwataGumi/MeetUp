import { localStreamState } from "@/atoms/streamState";
import { muteControlsState } from "@/atoms/muteControlsState";
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
  const [muteControls, setMuteControls] = useRecoilState(muteControlsState)

  useEffect(() => {
    localStream?.getAudioTracks().forEach(track => {
      track.enabled = muteControls.microphone;
    })
  }, [localStream, muteControls])

  if (!localStream) return;

  const toggleHandler = () => {
    setMuteControls({...muteControls, microphone: !muteControls.microphone})
  }

  return (
    <ToggleButton
      state={muteControls.microphone}
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
