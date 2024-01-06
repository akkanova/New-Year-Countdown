import { observer } from "mobx-react";
import { useState } from "react";

import OneMinuteLeft from "../assets/sounds/1-minute-left.mp3";
import TwoMinutesLeft from "../assets/sounds/2-minutes-left.mp3";
import FiveMinutesLeft from "../assets/sounds/5-minutes-left.mp3";
import FinalMusic from "../assets/sounds/Auld-lang-syne.mp3";

export interface SyncedAudioProps {
  timeLeftMS: number;
}

const SyncedAudio = observer((props: SyncedAudioProps) => {
  useSyncedAudio(FiveMinutesLeft, 5 * 60 * 1000);
  useSyncedAudio(TwoMinutesLeft,  2 * 60 * 1000);
  useSyncedAudio(OneMinuteLeft,   60 * 1000);
  useSyncedAudio(FinalMusic,      0);

  return (<></>);

  function useSyncedAudio(url: string, timeLeftToPlayMs: number, thresholdMs = 500) {
    const [audio] = useState(() => new Audio(url));
    const [hasPlayed, setPlayedState] = useState(false);

    if (!hasPlayed && Math.abs(props.timeLeftMS - timeLeftToPlayMs) < thresholdMs) {
      audio.play();
      setPlayedState(true);
    }
  }
});


export default SyncedAudio;