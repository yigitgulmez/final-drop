export type MoveAction = 'play_card' | 'draw_card' | 'pass';

export interface Move {
  _id: string;
  gameId: string;
  playerId: string;
  cardId: string | null;
  action: MoveAction;
  timestamp: Date;
}
