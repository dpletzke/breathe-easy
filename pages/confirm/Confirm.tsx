import React, { useCallback, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { NotifierSetupContext, StationsContext } from "../../context";

import { Button } from "../../components/Button";
// import { useDb } from "../../hooks";
import { useRealm } from "../../schemas";
import { Notifier } from "../../schemas/NotifierSchema";
import { useUser } from "@realm/react";

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
  const { notifierSetup, resetNotifierSetup } =
    useContext(NotifierSetupContext);
  const { stations } = useContext(StationsContext);
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  // const { createNotifier, realm } = useDb();
  const realm = useRealm();
  const user = useUser();

  const createNotifier = useCallback(
    ({ stationId, threshold }: { stationId: string; threshold: number }) => {
      // if the realm exists, create an Item
      realm.write(() => {
        return new Notifier(realm, {
          threshold,
          stationId,
          owner_id: user?.id,
        });
      });
    },
    [realm, user]
  );

  const onConfirm = () => {
    if (!notifierSetup.stationId || !notifierSetup.threshold) {
      setErrorMsg("Error something went wrong.");
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
      console.log(error);
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
          <Text style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</Text>
          <Button onPress={onConfirm}>Confirm</Button>
        </View>
      )}
    </View>
  );
};

export default Confirm;
