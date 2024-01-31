import { useEffect } from "react";
import { CardT } from "../types/Card";

export function useVisibleCardsUpdated(
  visibleCards: CardT["id"][] | undefined,
  setNewGrid: React.Dispatch<React.SetStateAction<CardT[] | undefined>>,
  setVisibleCards: (visibleCards: CardT["id"][] | undefined) => void,
): void {
  useEffect(() => {
    if (!visibleCards) {
      return;
    }

    if (visibleCards.length === 2) {
      if (visibleCards[0] === visibleCards[1]) {
        // Found two identical cards
        setNewGrid(
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
          setNewGrid(
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
}
