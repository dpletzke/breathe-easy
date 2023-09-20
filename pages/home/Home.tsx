import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
// import { useDb } from "../../hooks";
import { StationsContext } from "../../context";
import { Button } from "../../components/Button";
import { BSON } from "realm";
import { useUser } from "@realm/react";
import { useQuery, useRealm } from "../../schemas";
import { Notifier } from "../../schemas/NotifierSchema";
import { requestStation } from "../../utils/apiUtils";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const Home = ({ navigation }: Props) => {
  const { stations, setStationLookups, setStationResponses } =
    useContext(StationsContext);
  const user = useUser();
  const realmNotifiers = useQuery<Notifier>("Notifier");
  const realm = useRealm();

  const notifiers = useMemo(
    () =>
      Array.from(realmNotifiers).map((notifier) => {
        const notifierJson = notifier.toJSON() as {
          _id: BSON.ObjectId;
          owner_id: BSON.ObjectId;
          stationId: string;
          threshold: number;
        };
        return notifierJson;
      }),
    [realmNotifiers]
  );

  useEffect(() => {
    const notifiersForStationsWithoutData = notifiers.filter(
      (notifier) => !stations[notifier.stationId]
    );
    console.log(
      "notifiersForStationsWithoutData",
      notifiersForStationsWithoutData
    );
    Promise.all(
      notifiersForStationsWithoutData.map((notifier) => {
        return requestStation(notifier.stationId);
      })
    ).then((res) => {
      setStationResponses(res);
    });
  }, [notifiers]);

  const deleteNotifier = useCallback(
    (id: BSON.ObjectId) => () => {
      // if the realm exists, get the Item with a particular _id and delete it
      const notifier = realm.objectForPrimaryKey(Notifier, id); // search for a realm object with a primary key that is an objectId
      if (notifier) {
        if (notifier.owner_id !== user?.id) {
          Alert.alert("You can't delete someone else's task!");
        } else {
          realm.write(() => {
            realm.delete(notifier);
          });
        }
      }
    },
    [realm, user]
  );

  const logoutUser = () =>
    user
      ?.logOut()
      .then(() => {
        navigation.navigate("login");
      })
      .catch((error) => {
        console.log(error);
      });
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button onPress={logoutUser}>
        <Text>Logout</Text>
      </Button>
      <View>
        {notifiers.length > 0 &&
          notifiers.map((notifier, index) => {
            return (
              <View key={`${index}` + notifier._id}>
                <Text>
                  {stations[notifier.stationId]?.name} - {notifier.threshold}
                </Text>
                <Pressable onPress={deleteNotifier(notifier._id)}>
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
