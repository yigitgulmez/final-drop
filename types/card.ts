export type CardType = 'number' | 'skip' | 'reverse' | 'draw_two' | 'wild' | 'wild_draw_four';
export type CardColor = 'red' | 'green' | 'blue' | 'yellow' | null;

export interface Card {
  _id: string;
  type: CardType;
  color: CardColor;
  value: number | null;    // 0-9 or null
}
