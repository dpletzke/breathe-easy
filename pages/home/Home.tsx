import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Routes.tsx";
import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "home">;

const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 40,
  },
});

const Home = ({ navigation }: Props) => {

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    ></View>
  );
};

export default Home;
