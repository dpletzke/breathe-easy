import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

import type { RootStackParamList } from "../Routes";
import { NotifierSetupContext, StationsContext } from "../../context";

import { Button } from "../../components/Button";
import type { StationRecord } from "../../types";
import { requestStations } from "../../utils/apiUtils";

type Props = NativeStackScreenProps<RootStackParamList, "stationSelect">;

const StationSelect = ({ navigation }: Props) => {
  const { stations, setStationLookups } = useContext(StationsContext);
  const { setStationId } = useContext(NotifierSetupContext);

  const [selectedStation, setSelectedStation] = useState<StationRecord | null>(
    null
  );
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(10000);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      })
      .then(() => Location.getCurrentPositionAsync({}))
      .then((location) => {
        setLocation(location);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  useEffect(() => {
    if (!location) return;
    console.log("requesting stations");
    requestStations(location, radius)
      .then((res) => {
        console.log("got stations");
        setStationLookups(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error);
      });
  }, [location, radius]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 50,
      }}
    >
      <Button
        onPress={() => {
          setStationId(`${selectedStation?.stationId}` || "");
          navigation.navigate("thresholdSelect");
        }}
      >
        Go to Threshold
      </Button>
      {errorMsg && <Text> Error: {JSON.stringify(errorMsg, null, 2)}</Text>}
      {selectedStation && <Text>Selected Station: {selectedStation.name}</Text>}
      {Object.keys(stations).length > 0 && (
        <Picker
          selectedValue={selectedStation?.stationId}
          onValueChange={(itemValue) => {
            setSelectedStation({ ...stations[itemValue] } || null);
          }}
          style={{ height: 200, width: 400 }}
        >
          {Object.values(stations).map(({ name, stationId }) => (
            <Picker.Item key={stationId} label={name} value={stationId} />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default StationSelect;
