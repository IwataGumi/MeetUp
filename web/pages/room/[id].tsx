import SelfCamera from "@/components/Camera/SelfCamera";
import { useEffect, useRef, useState } from "react";
import { videoMinimumSize } from '@/utils/static';

const Room = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = [{}];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const itemPerRow = Math.ceil(Math.sqrt((users?.length ?? 0)));
  const row = Math.ceil(((users?.length ?? 0)) / itemPerRow);

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
      <div className="m-2 my-16 flex flex-col">
        <div className="mb-5 h-full max-h-[100%] flex flex-wrap justify-center items-center" ref={wrapperRef}>
          <SelfCamera className="m-2" width={size.width} height={size.height} />
        </div>
        <div className="fixed bottom-0 left-0 h-16 w-full bg-base-300 flex-0">

        </div>
      </div>
    </>
  );
};

export default Room;