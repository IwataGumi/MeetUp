import MicrophoneButton from "@/components/Camera/Controlls/MicrophoneButton";
import VideoButton from "@/components/Camera/Controlls/VideoButton";
import ConfigButton from "@/components/Camera/Controlls/ConfigButton";
import LeaveButton from "@/components/Camera/Controlls/LeaveButton";
import ConfigModal from "@/components/Modal/ConfigModal";
import ChatModal from "@/components/Modal/ChatModal";
import ChatButton from "@/components/Camera/Controlls/ChatButton";
import { useRef } from "react";
import { useRouter } from "next/router";


const VideoControlls = () => {
  const router = useRouter();
  const buttonClassName = 'mx-1 mb-2'
  const buttonSizeClassName = 'h-[3rem] w-[3rem] min-h-[3rem]'
  const controllButtonSize = 24

  const chatModalRef = useRef<HTMLDialogElement>(null);
  const configModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="fixed bg-base-100 bottom-0 left-0 h-16 w-full flex-0 flex justify-center items-center">
      <MicrophoneButton
        iconSize={controllButtonSize}
        buttonSizeClassName={buttonSizeClassName}
        className={buttonClassName}
      />
      <VideoButton
        iconSize={controllButtonSize}
        buttonSizeClassName={buttonSizeClassName}
        className={buttonClassName}
      />
      <ConfigButton
        iconSize={controllButtonSize}
        buttonSizeClassName={buttonSizeClassName}
        className={buttonClassName}
        onClick={() => configModalRef.current?.showModal()}
      />
      <ChatButton
        iconSize={controllButtonSize}
        buttonSizeClassName={buttonSizeClassName}
        className={buttonClassName}
        onClick={() => chatModalRef.current?.showModal()}
      />
      <LeaveButton
        iconSize={controllButtonSize}
        buttonSizeClassName={buttonSizeClassName}
        className={buttonClassName}
        onClick={() => router.push('/')}
      />
      <ChatModal ref={chatModalRef} />
      <ConfigModal ref={configModalRef} />
    </div>
  )
}

export default VideoControlls;