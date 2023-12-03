import { View, Image, TouchableOpacity, Text } from "react-native";

export const RestartButton = (props: { onPress: () => void }) => {
  return (
    <>
      <TouchableOpacity
        style={{
          alignItems: "center",
        }}
        activeOpacity={0.8}
        onPress={props.onPress}
      >
        <View
          style={{
            borderRadius: 50,
            padding: 5,
            backgroundColor: "#D9D6D6",
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              top: -0.5,
            }}
            source={require("../../assets/Restart.png")}
          />
        </View>
        <Text>New Game</Text>
      </TouchableOpacity>
    </>
  );
};
