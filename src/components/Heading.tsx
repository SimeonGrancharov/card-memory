import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Heading = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Card Memory Game</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
});
