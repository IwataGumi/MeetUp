import { localStreamState } from "@/atoms/streamState";
import { muteControlsState } from "@/atoms/muteControlsState";
import ToggleButton from "@/components/Button/ToggleButton";
import { useEffect, useState } from "react";
import { PiMicrophoneFill } from "react-icons/pi";
import { PiMicrophoneSlashFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultButtonSize, defaultButtonSizeClass } from "@/utils/static";

interface Props {
  iconSize: number;
  className: string;
  buttonSizeClassName: string;
}

const MicrophoneButton = ({ iconSize, className, buttonSizeClassName }: Props) => {
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
      iconSize={iconSize}
      state={muteControls.microphone}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiMicrophoneFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiMicrophoneSlashFill}
      buttonSizeClassName={buttonSizeClassName}
      toggleFunction={toggleHandler}
      className={className}
    />
  )
}

MicrophoneButton.defaultProps = {
  iconSize: defaultButtonSize,
  className: '',
  buttonSizeClassName: defaultButtonSizeClass,
}

export default MicrophoneButton;
