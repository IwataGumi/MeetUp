import { IconType } from "react-icons";

interface Props {
  className: string;
  Icon: IconType;
  onClick?: () => void;
}

const BUTTON_CLASS = 'btn btn-circle w-[3.5rem] h-[3.5rem] min-h-[3.5rem]'

const Button = ({
  className, Icon, onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${BUTTON_CLASS} ${className}`}
    >
      <Icon size={26} />
    </button>
  )
}

Button.defaultProps = {
  className: ''
}

export default Button;
