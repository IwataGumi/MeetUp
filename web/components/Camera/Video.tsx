import React from "react";

interface Props {
  muted?: boolean,
  className: string,
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({ muted, className }, ref) => {
    return (
      <video
        ref={ref}
        muted={muted}
        autoPlay={true}
        playsInline={true}
        className={`${className} w-[100%] h-[100%]`}
      />
    )
  }
);

Video.displayName = 'Video';
Video.defaultProps = {
  muted: false,
  className: ''
}

export default Video;