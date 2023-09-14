import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

import type { RootStackParamList } from "../Routes";

import { Button } from "../../components/Button";
import type { StationLookup, QualityType } from "../../types";
import { requestStation, requestStations } from "../../utils/apiUtils";
import { StationsContext } from "../../context/stations";

type Props = NativeStackScreenProps<RootStackParamList, "stationSelect">;

const StationSelect = ({ navigation }: Props) => {
  const { stations, setStationLookups, setStationData } =
    useContext(StationsContext);

  const [selectedStation, setSelectedStation] = useState<StationLookup | null>(
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

    requestStations(location, radius)
      .then((res) => {
        setStationLookups(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error);
      });
  }, [location, radius]);

  useEffect(() => {
    if (!selectedStation) return;

    requestStation(selectedStation.uid)
      .then((res) => {
        // setQuality(res.data.iaqi);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error);
      });
  }, [selectedStation]);

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
          navigation.navigate("settings");
        }}
      >
        Go to Settings
      </Button>
      {errorMsg && <Text> Error: {JSON.stringify(errorMsg, null, 2)}</Text>}
      {selectedStation && (
        <Text>Selected Station: {selectedStation.station.name}</Text>
      )}
      {stations.length > 0 && (
        <Picker
          selectedValue={selectedStation?.uid}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedStation(
              stations.find((s) => s.uid === itemValue) || null
            );
          }}
          style={{ height: 200, width: 400 }}
        >
          {stations.map((station) => (
            <Picker.Item
              key={station.uid}
              label={station.station.name}
              value={station.uid}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default StationSelect;
