import { globalConfig, GlobalConfigContext } from "./data/Config";
import { ConfigIcon } from "./sections/ConfigModal";
import Countdown from "./sections/Countdown";

export default function App() {
  return (
    <GlobalConfigContext.Provider value={globalConfig}>
      <ConfigIcon />
      <Countdown/>
    </GlobalConfigContext.Provider>
  );
}

