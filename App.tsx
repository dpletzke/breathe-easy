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
  return (
    <StationsProvider>
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    </StationsProvider>
  );
}

export default App;
