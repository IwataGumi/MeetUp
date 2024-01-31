import { PiGearSixFill } from "react-icons/pi";
import CircleIconButton from "@/components/Button/CircleIconButton";
import { defaultButtonSize, defaultButtonSizeClassName } from "@/utils/static";

interface Props {
  className: string;
  buttonSizeClassName: string;
  iconSize: number;
  onClick?: () => void;
}

const ConfigButton = ({ className, buttonSizeClassName, iconSize, onClick }: Props) => {
  return (
    <CircleIconButton
      Icon={PiGearSixFill}
      iconSize={iconSize}
      className={`btn-neutral ${className}`}
      buttonSizeClassName={buttonSizeClassName}
      onClick={onClick}
    />
  )
}

ConfigButton.defaultProps = {
  className: '',
  iconSize: defaultButtonSize,
  buttonSizeClassName: defaultButtonSizeClassName,
}

export default ConfigButton;
