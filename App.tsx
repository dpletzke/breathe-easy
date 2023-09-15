import Routes from "./pages/Routes";
import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { ContextProvider } from "./context";
import { RealmProvider } from "./schemas";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <RealmProvider>
      <ContextProvider>
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </ContextProvider>
    </RealmProvider>
  );
}

export default App;
