import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StationSelect from "./station-select/StationSelect";
import Confirm from "./confirm/Confirm";
import ThresholdSelect from "./threshold-select/ThresholdSelect";
import Home from "./home/Home";
import { useDb } from "../hooks";

export type RootStackParamList = {
  stationSelect: undefined;
  thresholdSelect: undefined;
  confirm: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const { deleteAllNotifiers } = useDb();
  useEffect(() => {
    deleteAllNotifiers();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
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
