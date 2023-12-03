import { Pressable, Image } from "react-native";
import { CardT } from "../types/Card";
import { images } from "../constants/images";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import { useEffect } from "react";

const questionMark = require("../../assets/QuestionMark.png");

export const Card = (props: {
  card: CardT;
  onPress: (id: CardT["id"]) => void;
  disabled: boolean;
  width: number;
}) => {
  const animatedValue = useSharedValue<number>(props.card.isVisible ? 1 : 0);

  useEffect(() => {
    if (!props.card.isVisible) {
      animatedValue.value = 0;
    } else {
      animatedValue.value = 1;
    }
  }, [props.card.isVisible]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(animatedValue.value, [0, 1], [-180, 0]);

    return {
      transform: [{ rotateY: withTiming(`${rotation}deg`, { duration: 300 }) }],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(animatedValue.value, [0, 1], [0, 180]);

    return {
      transform: [{ rotateY: withTiming(`${rotation}deg`, { duration: 300 }) }],
    };
  }, []);

  return (
    <Pressable
      style={{
        width: props.width,
        height: props.width,
        position: "relative",
      }}
      disabled={props.card.isGuessed || props.disabled}
      onPress={() => props.onPress(props.card.id)}
    >
      <Animated.Image
        style={[
          frontAnimatedStyle,
          {
            zIndex: props.card.isVisible ? 1 : 0,
            flex: 1,
            width: props.width,
            height: props.width,
            borderWidth: 1,
            borderColor: "grey",
            backfaceVisibility: "hidden",
            borderRadius: 8,
          },
        ]}
        source={images[props.card.id]}
      />
      <Animated.Image
        resizeMode="center"
        style={[
          backAnimatedStyle,
          {
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            width: props.width,
            height: props.width,
            borderWidth: 1,
            backfaceVisibility: "hidden",
            borderColor: "grey",
            borderRadius: 8,
            overflow: "hidden",
          },
        ]}
        source={questionMark}
      />
    </Pressable>
  );
};
