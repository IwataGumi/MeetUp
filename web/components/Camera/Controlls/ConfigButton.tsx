import Button from "@/components/Button/Button";
import { PiGearSixFill } from "react-icons/pi";

interface Props {
  className: string;
}

const ConfigButton = ({ className }: Props) => {
  const onClick = () => {
  }

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
