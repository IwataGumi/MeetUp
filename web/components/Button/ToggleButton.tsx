import { IconType } from "react-icons";

interface Props {
  state: boolean;
  className: string;
  ActiveClassName: string;
  ActiveIcon: IconType;
  PassiveClassName: string;
  PassiveIcon: IconType;
  toggleFunction: () => void;
}

const BUTTON_CLASS = 'btn btn-circle w-[3.5rem] h-[3.5rem] min-h-[3.5rem]'

const ToggleButton = ({
  state, className, ActiveClassName, ActiveIcon, PassiveClassName, PassiveIcon, toggleFunction
}: Props) => {
  if (state) {
    return (
      <button
        onClick={toggleFunction}
        className={`${BUTTON_CLASS} ${className} ${ActiveClassName}`}
      >
        <ActiveIcon size={26} />
      </button>
    )
  } else {
    return (
      <button
        onClick={toggleFunction}
        className={`${BUTTON_CLASS} ${className} ${PassiveClassName}`}
      >
        <PassiveIcon size={26} />
      </button>
    )
  }
}

ToggleButton.defaultProps = {
  className: '',
  ActiveClassName: '',
  PassiceClassName: '',
}

export default ToggleButton;
