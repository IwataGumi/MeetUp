import React from "react";

interface Props {
  width: number,
  height: number,
  className: string,
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ width, height, className }, ref) => {
    return (
      <div className={`max-w-[${width}px] max-h-[${height}] w-full`}>
        <video
          ref={ref}
          width="100%"
          height="100%"
          className={className}
          autoPlay={true}
          playsInline={true}
        />
      </div>
    )
  }
);

Video.displayName = 'Video';
Video.defaultProps = {
  className: ''
}

export default Video;