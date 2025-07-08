export type CardType = 'number' | 'block' | 'reverse' | 'draw_two' | 'wild' | 'wild_draw_four';
export type CardColor = 'red' | 'green' | 'blue' | 'yellow' | null;
export type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export interface Card {
  _id: string;
  type: CardType;
  color: CardColor;
  value: number | null;    // 0-9 or null
}
