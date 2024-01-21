import React from "react";

interface Props {
  muted?: boolean,
  width: number,
  height: number,
  className: string,
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ muted, width, height, className }, ref) => {
    return (
      <div className={`max-w-[${width}px] max-h-[${height}] w-full`}>
        <video
          ref={ref}
          width="100%"
          height="100%"
          muted={muted}
          autoPlay={true}
          playsInline={true}
          className={className}
        />
      </div>
    )
  }
);

Video.displayName = 'Video';
Video.defaultProps = {
  muted: false,
  className: ''
}

export default Video;