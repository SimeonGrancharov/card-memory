import { useEffect, useState } from "react";
import { CardT } from "../types/Card";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Difficulty } from "../types/Difficulty";
import { NewGameScreen } from "./NewGameScreen";
import { Heading } from "./Heading";

const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffleItems<T>(items: T[]): T[] {
  const result: T[] = [...items];

  for (let index = items.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[newIndex]] = [result[newIndex], result[index]];
  }

  return result;
}

function generateGrid(uniqueItems: number): CardT[] {
  const cardsToPlayWith = shuffleItems(cardIds).slice(-uniqueItems);

  return shuffleItems([...cardsToPlayWith, ...cardsToPlayWith]).map((id) => ({
    id,
    isVisible: false,
    isGuessed: false,
  }));
}

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

  const onCardPress = (index: number) => {
    const card = grid?.[index];
    if (!card) {
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
  };

  const createNewGame = (difficulty: Difficulty) => {
    let uniqueItems: number = 0;

    switch (difficulty) {
      case "easy": {
        uniqueItems = 4;
        break;
      }
      case "medium": {
        uniqueItems = 6;
        break;
      }
      case "hard": {
        uniqueItems = 8;
        break;
      }
    }

    setGrid(generateGrid(uniqueItems));
    setShouldRequestNewGame(false);
  };

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
      <NewGameScreen
        isVisible={shouldRequestNewGame}
        onDifficultySelect={createNewGame}
      />
      <View>
        <Heading />
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
              key={index}
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
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 200,
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
  },
});
