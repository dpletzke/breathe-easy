import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StationSelect from "./station-select/StationSelect";
import Settings from "./settings/Settings";
import Home from "./home/Home";

export type RootStackParamList = {
  stationSelect: undefined;
  settings: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="stationSelect">
        <Stack.Screen
          name="stationSelect"
          component={StationSelect}
          options={{ title: "Station Select" }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
