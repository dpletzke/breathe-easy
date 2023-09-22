import React, { useContext, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { useDb } from "../../hooks";
import { StationsContext } from "../../context";

import { requestStation } from "../../utils/apiUtils";
import { Button } from "../../components/Button";
import { onDisplayNotification } from "../../utils/notificationUtil";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const Home = ({ navigation }: Props) => {
  const { stations, setStationLookups, setStationResponses } =
    useContext(StationsContext);
  const { realm, user, ownNotifiersResults, deleteNotifier } = useDb();

  useEffect(() => {
    const notifiersForStationsWithoutData = ownNotifiersResults.filter(
      (notifier) => !stations[notifier.stationId]
    );

    Promise.all(
      notifiersForStationsWithoutData.map((notifier) => {
        return requestStation(notifier.stationId);
      })
    )
      .then((res) => {
        setStationResponses(res);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, [ownNotifiersResults]);

  const logoutUser = () =>
    user
      ?.logOut()
      .then(() => {
        navigation.navigate("login");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button onPress={logoutUser}>
        <Text>Logout</Text>
      </Button>
      <Button onPress={onDisplayNotification}>
        <Text>Send Notification</Text>
      </Button>
      <View>
        {ownNotifiersResults.length > 0 &&
          ownNotifiersResults.map((notifier, index) => {
            return (
              <View key={`${index}` + notifier._id}>
                <Text>
                  {stations[notifier.stationId]?.name} - {notifier.threshold}
                </Text>
                <Pressable onPress={() => deleteNotifier(notifier)}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            );
          })}
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
