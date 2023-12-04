import { useCallback, useEffect, useState } from "react";
import { CardT } from "../types/Card";

export function useShouldRequestNewGame(
  grid?: CardT[],
): [boolean, (newValue: boolean) => void] {
  const [shouldRequestNewGame, setShouldRequestNewGame] =
    useState<boolean>(true);

  useEffect(() => {
    if (grid?.every((card) => card.isGuessed)) {
      setTimeout(() => {
        setShouldRequestNewGame(true);
      }, 500);
    }
  }, [grid]);

  const updater = useCallback((newValue: boolean) => {
    setShouldRequestNewGame(newValue);
  }, []);

  return [shouldRequestNewGame, updater];
}
