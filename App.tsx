import Routes from "./pages/Routes";
import { SafeAreaView, StyleSheet } from "react-native";
import { StationRecord, StationsProvider } from "./context/stations";
import React, { useContext } from "react";
import { StationLookup, StationResponse } from "./types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  const stationsValue = {
    stations: new Map<number, StationRecord>(),
    setStationLookups: function (lookups: StationLookup[]) {
      const stations = this.stations;
      lookups.forEach((lookup) => {
        stations.set(lookup.uid, { lookup, data: null });
      });
    },
    deleteStation: function (uid: number) {
      this.stations.delete(uid);
    },
    setStationData: function (responses: StationResponse[]) {
      const stations = this.stations;
      responses.forEach((res) => {
        const station = stations.get(res.data.idx);
        if (station) {
          station.data = { ...res.data, time: res.time };
        }
      });
    },
  };

  return (
    <StationsProvider value={stationsValue}>
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    </StationsProvider>
  );
}

export default App;
