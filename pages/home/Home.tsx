import React, { useContext, useEffect, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
// import { useDb } from "../../hooks";
import { StationsContext } from "../../context";
import { Button } from "../../components/Button";
import { Results } from "realm";
import { useUser } from "@realm/react";
import { useQuery, useRealm } from "../../schemas";
import { Notifier } from "../../schemas/NotifierSchema";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const Home = ({ navigation }: Props) => {
  const { stations } = useContext(StationsContext);
  // const { notifiers, user } = useDb();
  const realm = useRealm();
  // const notifiers = realm.objects("Notifier");
  const notifiers = useQuery<Notifier>("Notifier");

  const hydratedNotifiers = useMemo(
    () =>
      Array.from(notifiers).map((notifier) => {
        const { stationId, threshold } = notifier.toJSON() as {
          stationId: string;
          threshold: number;
        };
        return {
          stationId,
          threshold,
          station: stations[stationId],
        };
      }),
    [notifiers, stations]
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {hydratedNotifiers.length > 0 &&
          hydratedNotifiers.map((notifier, index) => (
            <Text key={index + notifier.station?.lookup.uid}>
              {notifier.station?.lookup.station.name} - {notifier.threshold}
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
