import React, { createContext, useContext, useState } from "react";
import { StationLookup, StationResponse } from "../types";

export type StationRecord = {
  lookup: StationLookup;
  data: (StationResponse["data"] & { time: StationResponse["time"] }) | null;
};

type StationsType = { [key in string]: StationRecord };

export type StationsContextType = {
  stations: StationsType;
  setStationLookups: (lookups: StationLookup[]) => void;
  deleteStation: (uid: string) => void;
  setStationData: (responses: StationResponse[]) => void;
};

export const StationsContext = createContext<StationsContextType>({
  stations: {},
  setStationLookups: () => {},
  deleteStation: () => {},
  setStationData: () => {},
});

export const StationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stations, setStations] = useState<StationsType>({});

  const setStationLookups = (lookups: StationLookup[]) => {
    lookups.forEach((lookup) => {
      stations[`${lookup.uid}`] = { lookup, data: null };
    });
  };
  const deleteStation = (uid: string) => {
    delete stations[uid];
  };
  const setStationData = (responses: StationResponse[]) => {
    responses.forEach((res) => {
      const station = stations[`${res.data.idx}`];
      if (station) {
        station.data = { ...res.data, time: res.time };
      }
    });
  };
  return (
    <StationsContext.Provider
      value={{ stations, setStationLookups, setStationData, deleteStation }}
    >
      {children}
    </StationsContext.Provider>
  );
};
