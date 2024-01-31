import { IconType } from "react-icons";
import CircleIconButton from "./CircleIconButton";
import { defaultButtonSize, defaultButtonSizeClassName } from "@/utils/static";

interface Props {
  state: boolean;
  iconSize: number;
  className: string;
  ActiveClassName: string;
  ActiveIcon: IconType;
  PassiveClassName: string;
  PassiveIcon: IconType;
  buttonSizeClassName: string;
  toggleFunction: () => void;
}

const ToggleButton = ({
  state, iconSize, className, buttonSizeClassName, ActiveClassName, ActiveIcon, PassiveClassName, PassiveIcon, toggleFunction
}: Props) => {
  if (state) {
    return (
      <CircleIconButton
        onClick={toggleFunction}
        Icon={ActiveIcon}
        iconSize={iconSize}
        className={`${className} ${ActiveClassName}`}
        buttonSizeClassName={buttonSizeClassName}
      />
    )
  } else {
    return (
      <CircleIconButton
        onClick={toggleFunction}
        Icon={PassiveIcon}
        iconSize={iconSize}
        className={`${className} ${PassiveClassName}`}
        buttonSizeClassName={buttonSizeClassName}
      />
    )
  }
}

ToggleButton.defaultProps = {
  className: '',
  iconSize: defaultButtonSize,
  ActiveClassName: '',
  PassiceClassName: '',
  buttonSizeClassName: defaultButtonSizeClassName,
}

export default ToggleButton;
