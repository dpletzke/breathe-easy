import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "darkblue",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

export const Button = ({ onPress, children }: Props) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      accessibilityLabel="Learn more about this purple button"
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};
