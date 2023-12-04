import { useMemo } from "react";
import { CardT } from "../types/Card";
import { Dimensions } from "react-native";
import { COLUMN_GAP, MAIN_CONTAINER_PADDING } from "../constants/styles";

export function useContainerAndItemsWidth(grid: CardT[] | undefined): {
  containerWidth: number;
  itemWidth: number;
} {
  return useMemo(() => {
    const numberOfCols = (grid?.length ?? 0) / 4;

    const itemWidth = Math.min(
      (Dimensions.get("window").width -
        2 * MAIN_CONTAINER_PADDING -
        (numberOfCols - 1) * COLUMN_GAP) /
        numberOfCols,
      100,
    );
    const containerWidth =
      numberOfCols * itemWidth +
      (numberOfCols - 1) * COLUMN_GAP +
      2 * MAIN_CONTAINER_PADDING;

    return {
      itemWidth,
      containerWidth,
    };
  }, [grid]);
}
