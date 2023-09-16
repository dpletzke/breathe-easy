import React, { useContext, useEffect, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { useDb } from "../../hooks";
import { NotifierSetupContext, StationsContext } from "../../context";
import { Button } from "../../components/Button";
import { Results } from "realm";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const Home = ({ navigation }: Props) => {
  const { stations } = useContext(StationsContext);

  const { getNotifiers } = useDb();

  const notifiers = Array.from(getNotifiers());
  const hydratedNotifiers = useMemo(
    () =>
      notifiers.map((notifier) => ({
        ...notifier,
        station: stations.get(notifier.stationId)?.lookup,
      })),
    [notifiers, stations]
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {hydratedNotifiers.length > 0 &&
          hydratedNotifiers.map((notifier, index) => (
            <Text key={notifier.stationId}>
              {notifier.station?.station.name} - {notifier.threshold}
            </Text>
          ))}
        <Button
          onPress={() => {
            navigation.navigate("stationSelect");
          }}
        >
          Create New Alert
        </Button>
      </View>
    </View>
  );
};

export default Home;
