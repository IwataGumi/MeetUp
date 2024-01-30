import SelfCamera from "@/components/Camera/SelfCamera";
import { useEffect, useRef, useState } from "react";
import { videoMinimumSize } from '@/utils/static';
import MicrophoneButton from "@/components/Camera/Controlls/MicrophoneButton";
import VideoButton from "@/components/Camera/Controlls/VideoButton";
import ConfigButton from "@/components/Camera/Controlls/ConfigButton";
import LeaveButton from "@/components/Camera/Controlls/LeaveButton";
import ConfigModal from "@/components/Modal/ConfigModal";

const Room = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = [{}];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const configModalRef = useRef<HTMLDialogElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const itemPerRow = Math.ceil(Math.sqrt((users?.length ?? 0)));
  const row = Math.ceil(((users?.length ?? 0)) / itemPerRow);

  const buttonClassName = 'mx-1 mb-2'
  const buttonSizeClassName = 'h-[3rem] w-[3rem] min-h-[3rem]'
  const controllButtonSize = 24

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || !users) return;
    const observer = new ResizeObserver(() => {
      let itemWidth = element.clientWidth / itemPerRow - 16;
      let itemHeight = element.clientHeight / row - 16;

      if (videoMinimumSize.width > itemWidth || videoMinimumSize.height > itemHeight) {
        itemWidth = videoMinimumSize.width;
        itemHeight = videoMinimumSize.height;
      }

      const scale = Math.min(itemWidth / 16, itemHeight / 9);
      setSize({ width: Math.ceil(scale * 16), height: Math.ceil(scale * 9) });
    });

    observer.observe(element);
    return () => {
      observer?.disconnect();
    };
  }, [itemPerRow, row, users]);

  return (
    <>
      <div className="m-2 mt-16 flex flex-col">
        <div className="h-[calc(100vh-64px-64px)] flex justify-center sm:items-center" ref={wrapperRef}>
          <div style={{flex: '1 1 auto'}} className="h-full relative flex grow-[1 1 auto] flex-wrap justify-center">
            <SelfCamera className="m-2 w-full h-full" width={size.width} height={size.height} />
          </div>
        </div>
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
            <LeaveButton
              iconSize={controllButtonSize}
              buttonSizeClassName={buttonSizeClassName}
              className={buttonClassName}
            />
        </div>
      </div>
      <ConfigModal ref={configModalRef} />
    </>
  );
};

export default Room;