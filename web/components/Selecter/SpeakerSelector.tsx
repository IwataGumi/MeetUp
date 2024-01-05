import useDevices from "@/hooks/useDevices";
import { useEffect } from "react";

const SpeakerSelector = () => {
 const devices = useDevices('audioinput');

  useEffect(() => {
    console.log('test', devices)
  }, [devices])

 return (
  <p></p>
 )
}

export default SpeakerSelector;
