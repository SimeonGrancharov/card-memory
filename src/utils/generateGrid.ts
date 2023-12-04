import { cardIds } from "../constants/cardIds";
import { CardT } from "../types/Card";
import { shuffleItems } from "./shuffleItems";
import uuid from "react-native-uuid";

export function generateGrid(uniqueItems: number): CardT[] {
  // First shuffle the cards in order to draw them randomly and then pick
  // that much you will play with
  const cardsToPlayWith = shuffleItems(cardIds).slice(-uniqueItems);

  // Shuffle them again to achieve random positions per card and then generate the cards
  return shuffleItems([...cardsToPlayWith, ...cardsToPlayWith]).map((id) => ({
    uuid: uuid.v4() as string,
    id,
    isVisible: false,
    isGuessed: false,
  }));
}
