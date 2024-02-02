import VideoControlls from "@/components/Camera/Controlls/VideoControlls";
import VideoContainer from "@/components/Camera/VideoContainer";

const Room = () => {
  return (
    <>
      <div className="m-2 mt-16 flex flex-col">
        <VideoContainer />
        <VideoControlls />
      </div>
    </>
  );
};

export default Room;