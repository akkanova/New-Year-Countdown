import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class GlobalConfig {
  public readonly refreshRateMS = 100;
  public readonly muteBackgroundVideo = true;
  public readonly loopBackgroundVideo = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const globalConfig = new GlobalConfig();
export const GlobalConfigContext = createContext(globalConfig);