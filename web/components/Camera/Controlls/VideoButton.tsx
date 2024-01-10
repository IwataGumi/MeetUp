import ToggleButton from "@/components/Button/ToggleButton";
import { useState } from "react";
import { PiVideoCameraFill } from "react-icons/pi";
import { PiVideoCameraSlashFill } from "react-icons/pi";

interface Props {
  defaultState: boolean;
  className: string;
}

const VideoButton = ({ className, defaultState }: Props) => {
  const [isActive, setActive] = useState(defaultState);

  const toggleActive = () => {
    setActive(!isActive);
  }

  return (
    <ToggleButton
      state={isActive}
      ActiveClassName="btn-neutral"
      ActiveIcon={PiVideoCameraFill}
      PassiveClassName="btn-error"
      PassiveIcon={PiVideoCameraSlashFill}
      toggleFunction={toggleActive}
      className={className}
    />
  )
}

VideoButton.defaultProps = {
  defaultState: true,
  className: ''
}

export default VideoButton;
