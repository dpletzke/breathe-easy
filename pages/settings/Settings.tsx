import React from "react";
import { View, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Routes.tsx";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const Settings = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text>Go to Home</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
