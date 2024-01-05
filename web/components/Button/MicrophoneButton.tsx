import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { PiMicrophoneFill } from "react-icons/pi";
import { PiMicrophoneSlashFill } from "react-icons/pi";

interface Props {
  defaultState: boolean;
}

const MicrophoneButton = ({ defaultState }: Props) => {
  const [isActive, setActive] = useState(defaultState);

  const toggleActive = () => {
    setActive(!isActive);
  }

  return (
    <ToggleButton
      state={isActive}
      ActiveIcon={PiMicrophoneFill}
      PassiveIcon={PiMicrophoneSlashFill}
      toggleFunction={toggleActive}
    />
  )
}

MicrophoneButton.defaultProps = {
  defaultState: true,
}

export default MicrophoneButton;
