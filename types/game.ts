export type GameStatus = 'waiting' | 'in_progress' | 'finished';

export interface Game {
  _id: string;
  hostUserId: string;
  players: string[];
  status: GameStatus;
  winner: string | null;
  startedAt: Date ;
  endedAt: Date ;
  maxDurationMinutes: number;
}

export interface GameState {
  _id: string;
  gameId: string;
  currentPlayerId: string;
  direction: 1 | -1;  // 1 = clockwise, -1 = counter-clockwise
  drawPile: string[];
  discardPile: string[];
  hands: Record<string, string[]>;
}
