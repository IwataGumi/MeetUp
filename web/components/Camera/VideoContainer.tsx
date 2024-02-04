import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";
import { videoMinimumSize } from '@/utils/static';
import SelfCamera from "@/components/Camera/SelfCamera";

const VideoContainer = () => {
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
    <div className="h-[calc(100vh-64px-64px)] flex justify-center sm:items-center" ref={wrapperRef}>
      <div style={{flex: '1 1 auto'}} className="h-full relative flex grow-[1 1 auto] flex-wrap justify-center">
        <SelfCamera className="m-2 w-full h-full" width={size.width} height={size.height} />
      </div>
    </div>
  )
}

export default VideoContainer;
