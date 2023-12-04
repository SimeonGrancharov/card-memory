import { useCallback, useEffect, useState } from "react";
import { CardT } from "../types/Card";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Difficulty } from "../types/Difficulty";
import { NewGameScreen } from "./NewGameScreen";
import { Heading } from "./Heading";
import { RestartButton } from "./RestartButton";
import { generateGrid } from "../utils/generateGrid";

export const Game = () => {
  const [grid, setGrid] = useState<CardT[] | undefined>(undefined);
  const [visibleCards, setVisibleCards] = useState<CardT["id"][] | undefined>();

  const [shouldRequestNewGame, setShouldRequestNewGame] =
    useState<boolean>(true);

  useEffect(() => {
    if (!visibleCards) {
      return;
    }

    if (visibleCards.length === 2) {
      if (visibleCards[0] === visibleCards[1]) {
        // Found two identical cards
        setGrid(
          (grid) =>
            grid?.map((c) =>
              c.id === visibleCards[0]
                ? {
                    ...c,
                    isGuessed: true,
                  }
                : c,
            ),
        );
        setVisibleCards(undefined);
      } else {
        // Non-indentical cards => discard choices
        setTimeout(() => {
          setGrid(
            (grid) =>
              grid?.map((c) =>
                c.id === visibleCards[0] || c.id === visibleCards[1]
                  ? {
                      ...c,
                      isVisible: false,
                    }
                  : c,
              ),
          );
          setVisibleCards(undefined);
        }, 2000);
      }
    }
  }, [visibleCards?.length]);

  const onCardPress = useCallback(
    (index: number) => {
      const card = grid?.[index];

      if (!card || card.isGuessed) {
        return;
      }

      // If the currently opened card is pressed => flip it again and reset the
      // turn
      if (
        card.isVisible &&
        !card.isGuessed &&
        visibleCards?.includes(card.id)
      ) {
        setVisibleCards(undefined);

        setGrid(
          (grid) =>
            grid?.map((c, idx) =>
              idx === index
                ? {
                    ...c,
                    isVisible: false,
                  }
                : c,
            ),
        );
        return;
      }

      setVisibleCards(visibleCards ? [...visibleCards, card.id] : [card.id]);

      setGrid(
        (grid) =>
          grid?.map((c, idx) =>
            idx === index
              ? {
                  ...c,
                  isVisible: true,
                }
              : c,
          ),
      );
    },
    [visibleCards, grid, setGrid, setVisibleCards],
  );

  const onDifficultyChosen = useCallback((difficulty: Difficulty) => {
    let uniqueCards: number = 0;

    switch (difficulty) {
      case "easy": {
        uniqueCards = 4;
        break;
      }
      case "medium": {
        uniqueCards = 6;
        break;
      }
      case "hard": {
        uniqueCards = 8;
        break;
      }
    }

    setGrid(generateGrid(uniqueCards));
    setShouldRequestNewGame(false);
  }, []);

  const onRestartPress = useCallback(() => {
    setShouldRequestNewGame(true);
  }, []);

  const numberOfCols = (grid?.length ?? 0) / 4;
  const padding = 10;
  const colGap = 10;

  const itemWidth = Math.min(
    (Dimensions.get("window").width -
      2 * padding -
      (numberOfCols - 1) * colGap) /
      numberOfCols,
    100,
  );

  return (
    <>
      <View
        style={{
          marginTop: 50,
          flex: 1,
          alignItems: "center",
        }}
      >
        <Heading />
        <RestartButton onPress={onRestartPress} />
        <View
          style={[
            {
              paddingHorizontal: padding,
              width:
                numberOfCols * itemWidth +
                (numberOfCols - 1) * colGap +
                2 * padding,
              columnGap: colGap,
            },
            styles.mainContainer,
          ]}
        >
          {grid?.map((item, index) => (
            <Card
              key={item.uuid}
              card={item}
              disabled={visibleCards?.length === 2}
              width={itemWidth}
              onPress={() => {
                onCardPress(index);
              }}
            />
          ))}
        </View>
      </View>
      <NewGameScreen
        isVisible={shouldRequestNewGame}
        onDifficultySelect={onDifficultyChosen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
  },
});
