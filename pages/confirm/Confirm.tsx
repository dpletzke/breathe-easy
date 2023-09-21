import React, { useContext } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { NotifierSetupContext, StationsContext } from "../../context";
import { useDb } from "../../hooks";

import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "confirm">;

const Confirm = ({ navigation }: Props) => {
  const { notifierSetup, resetNotifierSetup } =
    useContext(NotifierSetupContext);
  const { stations } = useContext(StationsContext);
  const { createNotifier } = useDb();

  const onConfirm = () => {
    if (!notifierSetup.stationId || !notifierSetup.threshold) {
      Alert.alert("Error something went wrong.");
      navigation.navigate("stationSelect");
      return;
    }
    try {
      console.log("creating notifier");
      createNotifier({
        stationId: notifierSetup.stationId,
        threshold: notifierSetup.threshold,
      });
    } catch (error: any) {
      Alert.alert("Error", error.message);
      navigation.navigate("home");
      return;
    }
    resetNotifierSetup();
    navigation.navigate("home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {notifierSetup.stationId && (
        <View>
          <Text>
            {stations[notifierSetup.stationId].name} - {notifierSetup.stationId}
          </Text>
          <Text>{notifierSetup.threshold}</Text>
          <Button onPress={onConfirm}>Confirm</Button>
        </View>
      )}
    </View>
  );
};

export default Confirm;
