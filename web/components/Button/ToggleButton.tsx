import { IconType } from "react-icons";
import CircleIconButton from "./CircleIconButton";
import { defaultButtonSize, defaultButtonSizeClass } from "@/utils/static";

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

const BUTTON_CLASS = 'btn btn-circle'

const ToggleButton = ({
  state, iconSize, className, buttonSizeClassName, ActiveClassName, ActiveIcon, PassiveClassName, PassiveIcon, toggleFunction
}: Props) => {
  if (state) {
    return (
      <CircleIconButton
        onClick={toggleFunction}
        Icon={ActiveIcon}
        iconSize={iconSize}
        className={`${BUTTON_CLASS} ${buttonSizeClassName} ${className} ${ActiveClassName}`}
      />
    )
  } else {
    return (
      <button
        onClick={toggleFunction}
        className={`${BUTTON_CLASS} ${className} ${PassiveClassName}`}
      >
        <PassiveIcon size={iconSize} />
      </button>
    )
  }
}

ToggleButton.defaultProps = {
  className: '',
  iconSize: defaultButtonSize,
  ActiveClassName: '',
  PassiceClassName: '',
  buttonSizeClassName: defaultButtonSizeClass,
}

export default ToggleButton;
