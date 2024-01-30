import { defaultButtonSizeClass } from "@/utils/static";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  iconSize: number;
  className: string;
  buttonSizeClassName: string;
  onClick?: () => void;
}

const BUTTON_CLASS = 'btn btn-circle'

const CircleIconButton = ({
  Icon, iconSize, className, buttonSizeClassName, onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${BUTTON_CLASS} ${className} ${buttonSizeClassName}`}
    >
      <Icon size={iconSize} />
    </button>
  )
}

CircleIconButton.defaultProps = {
  className: '',
  buttonSizeClassName: defaultButtonSizeClass,
}

export default CircleIconButton;
