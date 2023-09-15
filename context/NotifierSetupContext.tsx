import React, { createContext, useContext, useState } from "react";
import { StationLookup, StationResponse } from "../types";

type NotifierSetupType = {
  stationId: number | null;
  threshold: number | null;
};

export type NotifierSetupContextType = {
  notifierSetup: NotifierSetupType;
  setNotifierSetup: React.Dispatch<
    React.SetStateAction<{ stationId: number | null; threshold: number | null }>
  >;
};

export const NotifierSetupContext = createContext<NotifierSetupContextType>({
  notifierSetup: {
    stationId: null,
    threshold: null,
  },
  setNotifierSetup: () => {},
});

type Props = { children: React.ReactNode };
export const NotifierSetupProvider = ({ children }: Props) => {
  const [notifierSetup, setNotifierSetup] = useState<NotifierSetupType>({
    stationId: null,
    threshold: null,
  });

  return (
    <NotifierSetupContext.Provider
      value={{ notifierSetup, setNotifierSetup }}
    >
      {children}
    </NotifierSetupContext.Provider>
  );
};
