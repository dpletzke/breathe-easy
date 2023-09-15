import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StationSelect from "./station-select/StationSelect";
import Confirm from "./confirm/Confirm";
import ThresholdSelect from "./threshold-select/ThresholdSelect";

export type RootStackParamList = {
  stationSelect: undefined;
  thresholdSelect: undefined;
  confirm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="stationSelect">
        <Stack.Screen
          name="stationSelect"
          component={StationSelect}
          options={{ title: "Station" }}
        />
        <Stack.Screen
          name="thresholdSelect"
          component={ThresholdSelect}
          options={{ title: "Threshold" }}
        />
        <Stack.Screen
          name="confirm"
          component={Confirm}
          options={{ title: "Confirm" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
