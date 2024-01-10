import Button from "@/components/Button/Button";
import { PiGearSixFill } from "react-icons/pi";

interface Props {
  className: string;
  onClick?: () => void;
}

const ConfigButton = ({ className, onClick }: Props) => {
  return (
    <Button
      Icon={PiGearSixFill}
      onClick={onClick}
      className={className}
    />
  )
}

ConfigButton.defaultProps = {
  className: ''
}

export default ConfigButton;
