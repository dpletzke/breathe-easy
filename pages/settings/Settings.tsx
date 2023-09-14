import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../Routes.tsx";
import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "settings">;

const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 40,
  },
});

const Settings = ({ navigation }: Props) => {
  const [triggerValue, setTriggerValue] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => {
          navigation.navigate("stationSelect");
        }}
      >
        Go Back
      </Button>
      <Text>Trigger Value:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setInputValue(text);
        }}
        value={inputValue}
        placeholder="Set trigger value"
        keyboardType="numeric"
      />
      <Button
        onPress={() => {
          setTriggerValue(parseInt(inputValue));
          navigation.navigate("stationSelect");
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default Settings;
