import ToggleButton from "@/components/Button/ToggleButton";
import { useState } from "react";
import { PiMicrophoneFill } from "react-icons/pi";
import { PiMicrophoneSlashFill } from "react-icons/pi";

interface Props {
  defaultState: boolean;
  className: string;
}

const MicrophoneButton = ({ className, defaultState }: Props) => {
  const [isActive, setActive] = useState(defaultState);

  const toggleActive = () => {
    setActive(!isActive);
  }

  return (
    <ToggleButton
      state={isActive}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiMicrophoneFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiMicrophoneSlashFill}
      toggleFunction={toggleActive}
      className={className}
    />
  )
}

MicrophoneButton.defaultProps = {
  defaultState: true,
  className: ''
}

export default MicrophoneButton;
