import Routes from "./pages/Routes";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { AppProvider, UserProvider } from "@realm/react";
import { ContextProvider } from "./context";
import { RealmProvider } from "./schemas";
import { appId, baseUrl } from "./atlasConfig.json";
import Login from "./pages/login/Login";
import { Notifier } from "./schemas/NotifierSchema";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

function App() {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={Login}>
        <RealmProvider
          fallback={LoadingIndicator}
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.log(error);
            },
          }}
        >
          <ContextProvider>
            <SafeAreaView style={styles.container}>
              <Routes />
            </SafeAreaView>
          </ContextProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
