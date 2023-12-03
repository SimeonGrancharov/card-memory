import { Difficulty } from "../types/Difficulty";
import { CardT } from "../types/Card";

const createCard = (id: number): CardT => ({
  id,
  isVisible: false,
  isGuessed: false,
});

/*****
 * [ Card, Card ],
 * [ Card, Card ]
 *
 * **/

function shuffleItems<T>(items: T[]): T[] {
  const result: T[] = [...items];

  for (let index = items.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[newIndex]] = [result[newIndex], result[index]];
  }

  return result;
}

class Game {
  private cardIds: number[];
  private grid: CardT[];
  private flipped: CardT["id"] | undefined = undefined;
  private guessed: number[] = [];

  constructor(cardIds: number[]) {
    this.cardIds = cardIds;
    this.grid = [];
  }

  getGrid = (): CardT[] => {
    return this.grid;
  };

  newGame = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy": {
        this.grid = [];
        // First shuffle the cards
        const deck = shuffleItems(this.cardIds);

        // Then for easy mode, we have 4 cards to take
        const cards = deck.slice(-4);
        // Then we want to generate their random order
        const work = shuffleItems([...cards, ...cards]);

        // Then generate the grid
        for (let index = 0; index <= work.length - 1; index++) {
          this.grid.push(createCard(work[index]));
        }

        break;
      }

      case "medium": {
        // for (let index = 0; index <= this.deck.length; index += 2) {
        //   this.grid.push([this.deck[index], this.deck[index + 1]]);
        // }
        break;
      }

      case "hard": {
        // for (let index = 0; index <= this.deck.length; index += 2) {
        //   this.grid.push([this.deck[index], this.deck[index + 1]]);
        // }
        break;
      }
    }
  };

  check = (card: CardT) => {
    if (this.flipped === undefined) {
      this.flipped = card.id;

      return;
    }

    if (this.flipped === card.id) {
      this.grid.forEach((c) => {
        if (c.id === card.id) {
          c.isVisible = true;
          c.isGuessed = true;
        }
      });
    } else {
      this.grid.forEach((c) => {
        if (c.id === card.id || c.id === this.flipped) {
          c.isVisible = false;
        }
      });
    }
  };

  flipCard = (index: number) => {
    const card = this.grid[index];
    card.isVisible = true;
  };
}

export const game = new Game([1, 2, 3, 4, 5, 6, 7, 8, 9]);
