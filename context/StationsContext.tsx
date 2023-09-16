import React, { createContext, useContext, useState } from "react";
import { StationLookup, StationResponse } from "../types";

export type StationRecord = {
  lookup: StationLookup;
  data: (StationResponse["data"] & { time: StationResponse["time"] }) | null;
};

export type StationsContextType = {
  stations: Map<string, StationRecord>;
  setStationLookups: (lookups: StationLookup[]) => void;
  deleteStation: (uid: string) => void;
  setStationData: (responses: StationResponse[]) => void;
};

export const StationsContext = createContext<StationsContextType>({
  stations: new Map(),
  setStationLookups: () => {},
  deleteStation: () => {},
  setStationData: () => {},
});

export const StationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stations, setStations] = useState<Map<string, StationRecord>>(
    new Map()
  );

  const setStationLookups = (lookups: StationLookup[]) => {
    lookups.forEach((lookup) => {
      stations.set(`${lookup.uid}`, { lookup, data: null });
    });
  };
  const deleteStation = (uid: string) => {
    stations.delete(uid);
  };
  const setStationData = (responses: StationResponse[]) => {
    responses.forEach((res) => {
      const station = stations.get(`${res.data.idx}`);
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
