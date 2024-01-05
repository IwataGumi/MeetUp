import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { PiVideoCameraFill } from "react-icons/pi";
import { PiVideoCameraSlashFill } from "react-icons/pi";

interface Props {
  defaultState: boolean;
}

const VideoButton = ({ defaultState }: Props) => {
  const [isActive, setActive] = useState(defaultState);

  const toggleActive = () => {
    setActive(!isActive);
  }

  return (
    <ToggleButton
      state={isActive}
      ActiveIcon={PiVideoCameraFill}
      PassiveIcon={PiVideoCameraSlashFill}
      toggleFunction={toggleActive}
    />
  )
}

VideoButton.defaultProps = {
  defaultState: true,
}

export default VideoButton;
