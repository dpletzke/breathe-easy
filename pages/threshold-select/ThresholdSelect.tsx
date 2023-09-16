import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../Routes";
import { NotifierSetupContext } from "../../context";

import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "thresholdSelect">;

const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 40,
  },
});

const ThresholdSelect = ({ navigation }: Props) => {
  const { notifierSetup, setStationId, setThreshold } =
    useContext(NotifierSetupContext);

  const [inputValue, setInputValue] = useState<string>(
    `${notifierSetup.threshold || ""}`
  );

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
          setInputValue(text.replace(/[^0-9]/g, ""));
        }}
        value={inputValue}
        placeholder="Set threshold value"
        keyboardType="numeric"
      />
      <Button
        onPress={() => {
          setThreshold(parseInt(inputValue));
          navigation.navigate("confirm");
        }}
      >
        Next
      </Button>
    </View>
  );
};

export default ThresholdSelect;
