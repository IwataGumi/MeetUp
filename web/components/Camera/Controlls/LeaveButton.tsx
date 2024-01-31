import { MdCallEnd } from "react-icons/md";
import CircleIconButton from "@/components/Button/CircleIconButton";
import { defaultButtonSizeClassName } from "@/utils/static";

interface Props {
  className: string;
  buttonSizeClassName: string;
  iconSize: number;
  onClick?: () => void;
}

const BUTTON_CLASS = 'btn btn-error';

const LeaveButton = ({className, buttonSizeClassName, iconSize, onClick}: Props) => {
  return (
    <CircleIconButton
      Icon={MdCallEnd}
      iconSize={iconSize}
      className={`${BUTTON_CLASS} ${className}`}
      buttonSizeClassName={buttonSizeClassName}
      onClick={onClick}
    />
  )
}

LeaveButton.defaultProps = {
  className: '',
  buttonSizeClassName: defaultButtonSizeClassName,
}

export default LeaveButton;
