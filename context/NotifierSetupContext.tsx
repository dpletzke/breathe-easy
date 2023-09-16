import React, { createContext, useContext, useState } from "react";
import { StationLookup, StationResponse } from "../types";

type NotifierSetupType = {
  stationId: string | null;
  threshold: number | null;
};

export type NotifierSetupContextType = {
  notifierSetup: NotifierSetupType;
  setStationId: (stationId: string) => void;
  setThreshold: (threshold: number) => void;
  resetNotifierSetup: () => void;
};

export const NotifierSetupContext = createContext<NotifierSetupContextType>({
  notifierSetup: {
    stationId: null,
    threshold: null,
  },
  setStationId: () => {},
  setThreshold: () => {},
  resetNotifierSetup: () => {},
});

type Props = { children: React.ReactNode };
export const NotifierSetupProvider = ({ children }: Props) => {
  const [notifierSetup, setNotifierSetup] = useState<NotifierSetupType>({
    stationId: null,
    threshold: null,
  });

  const setStationId = (stationId: string) => {
    setNotifierSetup((prev) => ({ ...prev, stationId }));
  };

  const setThreshold = (threshold: number) => {
    setNotifierSetup((prev) => ({ ...prev, threshold }));
  };

  const resetNotifierSetup = () => {
    setNotifierSetup({
      stationId: null,
      threshold: null,
    });
  };

  return (
    <NotifierSetupContext.Provider
      value={{ notifierSetup, setStationId, setThreshold, resetNotifierSetup }}
    >
      {children}
    </NotifierSetupContext.Provider>
  );
};
