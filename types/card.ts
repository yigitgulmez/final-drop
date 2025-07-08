export type CardType =
  | "number"
  | "block"
  | "reverse"
  | "draw_two"
  | "wild"
  | "wild_draw_four";

export type CardColor = "red" | "green" | "blue" | "yellow" | null;

export type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export type IconProps = {
  color: string;
  size: number;
};

export interface Card {
  _id: string;
  type: CardType;
  color: CardColor;
  value: CardNumber;
}

type NumberCardProps = {
  type: "number";
  number: Exclude<CardNumber, null>;
  icon?: never;
  color: Exclude<CardColor, null>;
};

type ColoredIconCardProps = {
  type: "block" | "reverse" | "draw_two";
  icon: CardType;
  number?: never;
  color: Exclude<CardColor, null>;
};

type WildCardProps = {
  type: "wild" | "wild_draw_four";
  icon: CardType;
  number?: never;
  color?: null;
};

type BaseProps = {
  width?: number;
  height?: number;
};

export type CardSvgProps = BaseProps & (
  | NumberCardProps
  | ColoredIconCardProps
  | WildCardProps
);
