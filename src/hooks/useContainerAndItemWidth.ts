import { useMemo } from "react";
import { CardT } from "../types/Card";
import { Dimensions } from "react-native";
import { ColumnGap, MainContainerPadding } from "../constants/styles";

export function useContainerAndItemsWidth(grid: CardT[] | undefined): {
  containerWidth: number;
  itemWidth: number;
} {
  return useMemo(() => {
    const numberOfCols = (grid?.length ?? 0) / 4;

    const itemWidth = Math.min(
      (Dimensions.get("window").width -
        2 * MainContainerPadding -
        (numberOfCols - 1) * ColumnGap) /
        numberOfCols,
      100,
    );
    const containerWidth =
      numberOfCols * itemWidth +
      (numberOfCols - 1) * ColumnGap +
      2 * MainContainerPadding;

    return {
      itemWidth,
      containerWidth,
    };
  }, [grid]);
}
