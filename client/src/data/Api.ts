import { useEffect, useState } from "react";

export function useTimeCorrection() {
  const [timeCorrection, setCorrection] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams({ 
      timestamp: Date.now().toString()
    });

    fetch("/api/sync?" + params, {
      cache: "no-cache",
      method: "GET"
    })
      .then((response) => response.json())
      .then((data: ServerSyncInfo) => {
        const t3 = Date.now();

        if (data != null) {
          const offset = ((data.t1 - data.t0) + (data.t2 - t3)) / 2;
          const delay = (t3 - data.t0) - (data.t2 - data.t1);
          const corrected = offset + delay / 2;

          setCorrection(corrected);
        }
      });
  }, []);

  return timeCorrection;
}

export interface ServerSyncInfo {
  t0: number;
  t1: number;
  t2: number;
}