import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Difficulty } from "../types/Difficulty";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Heading } from "./Heading";

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 50,
    marginTop: 50,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeading: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "400",
    color: "black",
  },
  optionsContainer: {
    marginTop: 15,
    alignSelf: "stretch",
    rowGap: 20,
  },
  option: {
    paddingVertical: 20,
    borderWidth: 1,
    borderCurve: "continuous",
    borderRadius: 8,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "500",
  },
});

export const NewGameScreen = (props: {
  isVisible: boolean;
  onDifficultySelect: (difficulty: Difficulty) => void;
}) => {
  return props.isVisible ? (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.duration(500)}
      style={styles.mainContainer}
    >
      <Heading />
      <View style={styles.innerContainer}>
        <Text style={styles.subHeading}>Select difficulty</Text>
        <View style={styles.optionsContainer}>
          {(["easy", "medium", "hard"] as const).map((dif) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={dif}
              onPress={() => props.onDifficultySelect(dif)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{dif.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  ) : null;
};
