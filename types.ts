type ErrorResponse = {
  status: "error";
  message: string;
};

export type StationLookup = {
  uid: number;
  aqi: number;
  lat: number;
  lon: number;
  station: {
    name: string;
    time: string;
  };
};

export type StationsLookupResponse =
  | ErrorResponse
  | {
      status: "ok";
      data: StationLookup[];
    };

type StationAttribution = {
  url: string;
  name: string;
  station: string;
};

type StationCity = {
  geo: [number, number];
  name: string;
  url: string;
  location: string;
};

type StationTime = {
  s: string;
  tz: string;
  v: number;
  iso: string;
};

export type QualityType = {
  pm25: {
    v: 54;
  };
};

export type StationResponse =
  | ErrorResponse
  | {
      status: "ok";
      data: {
        aqi: "-" | number;
        idx: number;
        attributions: StationAttribution[] | [];
        city: StationCity;
        dominentpol: string;
        iaqi: QualityType;
      };
      time: StationTime;
    };
