import { observer } from "mobx-react";
import { useContext, useRef } from "react";

import { GlobalConfigContext } from "../data/Config";

export interface SyncedVideoProps {
  timeLeftMS: number;
}

const SyncedVideo = observer((props: SyncedVideoProps) => {
  const config = useContext(GlobalConfigContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayingRef = useRef(false);

  if (!isPlayingRef.current && videoRef.current && Math.abs(props.timeLeftMS - 30000) < 500) {
    isPlayingRef.current = true;
    videoRef.current.play();
  }

  return (
    <video 
      src="background-video.mp4"
      className="fixed right-0 bottom-0 min-h-full min-w-full"
      muted={config.muteBackgroundVideo}
      loop={config.loopBackgroundVideo}
      ref={videoRef}>
    </video>
  );
});

export default SyncedVideo;