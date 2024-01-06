import { observer } from "mobx-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import NumberDisplay from "../common/NumberDisplay";
import { useTimeCorrection } from "../data/Api";
import { GlobalConfigContext } from "../data/Config";
import SyncedAudio from "./SyncedAudio";
import SyncedVideo from "./SyncedVideo";

const Countdown = observer(() => {
  const config = useContext(GlobalConfigContext);

  const clientServerTimeDiff = useTimeCorrection();
  const futureTimestamp = useMemo(() => new Date(2024, 0, 1, 0, 0, 0, 0).getTime(), []);
  const getTimeLeft = useCallback(() => futureTimestamp - (Date.now() + clientServerTimeDiff), 
    [clientServerTimeDiff, futureTimestamp]);

  const [timeLeftMS, setTimeLeftMS] = useState(getTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeLeftMS(getTimeLeft()), 
      config.refreshRateMS
    );

    return () => clearInterval(intervalId);
  }, [config.refreshRateMS, getTimeLeft]);

  let seconds = (timeLeftMS / 1000) | 0;
  let minutes = (seconds / 60) | 0; 
  let hours   = (minutes / 60) | 0;

  seconds %= 60;
  minutes %= 60;
  hours   %= 24;

  return (<>
    {timeLeftMS < 6 * 60 * 1000 && <>
      <SyncedAudio timeLeftMS={timeLeftMS} />
      <SyncedVideo timeLeftMS={timeLeftMS} />
    </>}

    {timeLeftMS > -1
      ? <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-72 md:w-2/6 flex flex-row">
        <div className="flex flex-row justify-center translate-y-[10%] text-5xl md:text-9xl xl:text-[12rem] 2xl:text-[15rem] font-DIN w-full">
          <NumberDisplay value={(hours / 24) | 0} digits={3}/>
          <p>:</p>
          <NumberDisplay value={hours} digits={2}/>
          <p>:</p>
          <NumberDisplay value={minutes} digits={2}/>
          <p>:</p>
          <NumberDisplay value={seconds} digits={2}/>
        </div> 
      </div>

      : <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center w-full">
        <h1 className="text-2xl md:text-5xl lg:text-8xl xl:text-[12rem] font-bold font-DIN translate-y-32 md:translate-y-48 lg:translate-y-96" 
          style={{ animation: "color-animation 5s linear 0.3s infinite" }}>
          Happy New Year!
        </h1>
      </div>
    }
  </>);
});

export default Countdown;