import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { NotifierSetupContext, StationsContext } from "../../context";
import { Button } from "../../components/Button";

const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 40,
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "confirm">;

const Confirm = ({ navigation }: Props) => {
  const { notifierSetup } = useContext(NotifierSetupContext);
  const { stations } = useContext(StationsContext);
  useEffect(() => {
    console.log(notifierSetup);
  }, [notifierSetup]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {notifierSetup.stationId && (
        <View>
          <Text>
            {stations.get(notifierSetup.stationId)?.lookup.station.name} -{" "}
            {notifierSetup.stationId}
          </Text>
          <Text>{notifierSetup.threshold}</Text>
          <Button
            onPress={() => {
              
              navigation.navigate("stationSelect");
            }}
          >
            Confirm
          </Button>
        </View>
      )}
    </View>
  );
};

export default Confirm;
