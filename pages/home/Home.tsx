import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import {
  Button,
  ButtonText,
  ChevronDownIcon,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";

import type { RootStackParamList } from "../Routes";
import { getSquareCoordinates } from "../../utils/geoUtils";

import type {
  StationLookup,
  StationsLookupResponse,
  StationResponse,
  QualityType,
} from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  const [stations, setStations] = useState<StationLookup[] | []>([]);
  const [selectedStation, setSelectedStation] = useState<StationLookup | null>(
    null
  );
  const [quality, setQuality] = useState<QualityType | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stationsApiBaseUrl = "https://api.waqi.info/v2";

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

    const boundingCoords = getSquareCoordinates(
      location.coords.latitude,
      location.coords.longitude,
      5000
    ).join(",");

    const urlStationsLookup =
      `${stationsApiBaseUrl}/map/bounds?latlng=${boundingCoords}` +
      `&networks=all&token=${process.env.EXPO_PUBLIC_API_TOKEN}`;

    fetch(urlStationsLookup)
      .then((response) => response.json())
      .then((data: StationsLookupResponse) => {
        if (data.status === "error") {
          setErrorMsg(data.message);
          return;
        }
        setStations(data.data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, [location]);

  useEffect(() => {
    if (!selectedStation) return;
    const urlSelectedStationRequest =
      `${stationsApiBaseUrl}/feed/@${selectedStation?.station.name}` +
      `/?token=${process.env.EXPO_PUBLIC_API_TOKEN}`;
      console.log(urlSelectedStationRequest)
    fetch(urlSelectedStationRequest)
      .then((response) => response.json())
      .then((data: StationResponse) => {
        if (data.status === "error") {
          setErrorMsg(data.message);
          return;
        }
        console.log(JSON.stringify(data, null, 2));
        setQuality(data.data.iaqi);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, [selectedStation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 100,
      }}
    >
      <Text>Home Screen</Text>
      {errorMsg && <Text> Error: {errorMsg}</Text>}
      {selectedStation && (
        <Text>
          {selectedStation.station.name} - {selectedStation.aqi}
        </Text>
      )}
      {quality && (
        <View>
          <Text>Air Quality:{quality.pm25.v}</Text>
        </View>
      )}
      {stations.length > 0 && (
        <Select>
          <SelectTrigger variant="outline" size="lg">
            <SelectInput
              placeholder="Select option"
              value={selectedStation?.station.name}
              placeholderTextColor="gray"
              style={{ width: 100 }}
            />
            <SelectIcon size="small">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {stations.map((station) => (
                <SelectItem
                  key={station.uid}
                  label={station.station.name}
                  value={`${station.uid}`}
                  onPress={() => {
                    setSelectedStation(station);
                  }}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      )}
      <Button
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <ButtonText>Go to Details</ButtonText>
      </Button>
    </View>
  );
};

export default Home;
