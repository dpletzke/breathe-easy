import { createContext } from "react";
import { StationLookup, StationResponse } from "../types";

type StationRecord = {
  lookup: StationLookup;
  data: (StationResponse["data"] & { time: StationResponse["time"] }) | null;
};

export type StationsContextType = {
  stations: Map<number, StationRecord>;
  setStationLookups: (lookups: StationLookup[]) => void;
  deleteStation: (uid: number) => void;
  setStationData: (responses: StationResponse[]) => void;
};

export const StationsContext = createContext<StationsContextType>({
  stations: new Map(),
  setStationLookups: () => {},
  deleteStation: () => {},
  setStationData: () => {},
});

export const StationsProvider = StationsContext.Provider;
