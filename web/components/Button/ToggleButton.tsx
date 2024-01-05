import { IconType } from "react-icons";

interface Props {
  state: boolean;
  ActiveIcon: IconType;
  PassiveIcon: IconType;
  toggleFunction: () => void;
}

const ToggleButton = ({
  state, ActiveIcon, PassiveIcon, toggleFunction
}: Props) => {
  if (state) {
    return (
      <button onClick={toggleFunction} className="btn btn-outline btn-circle">
        <ActiveIcon size={18} />
      </button>
    )
  } else {
    return (
      <button onClick={toggleFunction} className="btn btn-circle btn-error">
        <PassiveIcon size={18} />
      </button>
    )
  }
}

export default ToggleButton;
