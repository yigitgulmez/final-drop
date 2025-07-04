export interface User {
  _id: string;             // MongoDB ObjectId as string
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  createdAt: Date;
}

export type CardType = 'number' | 'skip' | 'reverse' | 'draw_two' | 'wild' | 'wild_draw_four';
export type CardColor = 'red' | 'green' | 'blue' | 'yellow' | null;

export interface Card {
  _id: string;
  type: CardType;
  color: CardColor;
  value: number | null;    // 0-9 or null
}

export type GameStatus = 'waiting' | 'in_progress' | 'finished';

export interface Game {
  _id: string;
  hostUserId: string;
  players: string[];       // Array of User _id
  status: GameStatus;
  winner: string | null;   // Winner user id or null
  startedAt: Date | null;
  endedAt: Date | null;
  maxDurationMinutes: number;
}

export interface GameState {
  _id: string;
  gameId: string;
  currentPlayerId: string;
  direction: 1 | -1;  // 1 = clockwise, -1 = counter-clockwise
  drawPile: string[];      // Array of Card _id
  discardPile: string[];
  hands: Record<string, string[]>; // userId -> array of card _id
}

export type MoveAction = 'play_card' | 'draw_card' | 'pass';

export interface Move {
  _id: string;
  gameId: string;
  playerId: string;
  cardId: string | null;
  action: MoveAction;
  timestamp: Date;
}
