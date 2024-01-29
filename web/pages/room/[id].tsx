import SelfCamera from "@/components/Camera/SelfCamera";
import { useRef } from "react";

const Room = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div>
      <SelfCamera width={740} height={416} withControlls={true} ref={videoRef} />
    </div>
  );
};

export default Room;