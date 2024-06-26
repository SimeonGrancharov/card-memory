import { useCallback, useState } from "react";
import { CardT } from "../types/Card";
import { StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Difficulty } from "../types/Difficulty";
import { NewGameScreen } from "./NewGameScreen";
import { Heading } from "./Heading";
import { RestartButton } from "./RestartButton";
import { generateGrid } from "../utils/generateGrid";
import { useShouldRequestNewGame } from "../hooks/useShouldRequestNewGame";
import { ColumnGap, MainContainerPadding } from "../constants/styles";
import { useContainerAndItemsWidth } from "../hooks/useContainerAndItemWidth";
import { useVisibleCardsUpdated } from "../hooks/useVisibleItemsUpdate";

export const Game = () => {
  const [grid, setGrid] = useState<CardT[] | undefined>(undefined);
  const [visibleCards, setVisibleCards] = useState<CardT["id"][] | undefined>();
  const [shouldRequestNewGame, setShouldRequestNewGame] =
    useShouldRequestNewGame(grid);

  useVisibleCardsUpdated(visibleCards, setGrid, setVisibleCards);

  const onCardPress = useCallback((card: CardT) => {
    if (!card || card.isGuessed) {
      return;
    }

    // If the currently opened card is pressed => flip it again and reset the
    // turn
    if (card.isVisible && !card.isGuessed) {
      setVisibleCards(undefined);

      setGrid(
        (grid) =>
          grid?.map((c) =>
            c.uuid === card.uuid
              ? {
                  ...c,
                  isVisible: false,
                }
              : c,
          ),
      );
    } else {
      setVisibleCards((visibleCards) =>
        visibleCards ? [...visibleCards, card.id] : [card.id],
      );

      setGrid(
        (grid) =>
          grid?.map((c) =>
            c.uuid === card.uuid
              ? {
                  ...c,
                  isVisible: true,
                }
              : c,
          ),
      );
    }
  }, []);

  const startNewGame = useCallback((difficulty: Difficulty) => {
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

  const { containerWidth, itemWidth } = useContainerAndItemsWidth(grid);

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
              paddingHorizontal: MainContainerPadding,
              width: containerWidth,
              columnGap: ColumnGap,
            },
            styles.mainContainer,
          ]}
        >
          {grid?.map((item) => (
            <Card
              key={item.uuid}
              card={item}
              disabled={visibleCards?.length === 2}
              width={itemWidth}
              onPress={onCardPress}
            />
          ))}
        </View>
      </View>
      <NewGameScreen
        isVisible={shouldRequestNewGame}
        onDifficultySelect={startNewGame}
        shouldShowSuccess={Boolean(grid?.every((card) => card.isGuessed))}
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
