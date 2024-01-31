import { PiChatTextFill } from "react-icons/pi";
import CircleIconButton from "@/components/Button/CircleIconButton";
import { defaultButtonSize, defaultButtonSizeClassName } from "@/utils/static";

interface Props {
  className: string;
  buttonSizeClassName: string;
  iconSize: number;
  onClick?: () => void;
}

const ChatButton = ({ className, buttonSizeClassName, iconSize, onClick }: Props) => {
  return (
    <CircleIconButton
      Icon={PiChatTextFill}
      iconSize={iconSize}
      className={`btn-neutral ${className}`}
      buttonSizeClassName={buttonSizeClassName}
      onClick={onClick}
    />
  )
}

ChatButton.defaultProps = {
  className: '',
  iconSize: defaultButtonSize,
  buttonSizeClassName: defaultButtonSizeClassName,
}

export default ChatButton;