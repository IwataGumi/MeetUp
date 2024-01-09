import React from "react";

interface Props {
  size: {
    width: number,
    height: number,
  }
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ size }, ref) => {
    return (
      <div>
        <video
          ref={ref}
          width={size.width}
          height={size.height}
        />
      </div>
    )
  }
);

Video.displayName = 'Video';

export default Video;