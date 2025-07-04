## 📁 MongoDB Collection Structure – UNO Card Game

### 1. `users` – Users

```js
{
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
}
```

```json
{
  "_id": ObjectId,
  "email": "yigit@yigitgulmez.com",
  "nickname": "yeniasd",
  "firstName": "Yiğit",
  "lastName": "Gülmez",
  "passwordHash": "bcrypt_hash",
  "createdAt": ISODate
}
```

---

### 2. `cards` – Cards (Static Data)

```js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['number', 'skip', 'reverse', 'draw_two', 'wild', 'wild_draw_four'], 
    required: true 
  },
  color: { 
    type: String, 
    enum: ['red', 'green', 'blue', 'yellow', null], 
    default: null 
  },
  value: { 
    type: Number, 
    min: 0, 
    max: 9, 
    default: null 
  }
});

module.exports = mongoose.model('Card', cardSchema);
```

```json
{
  "_id": ObjectId,
  "type": "number",              // "number" | "skip" | "reverse" | "draw_two" | "wild" | "wild_draw_four"
  "color": "red",                // "red" | "green" | "blue" | "yellow" | null
  "value": 3                     // 0–9 | null
}
```

---

### 3. `games` – Games

```js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  hostUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['waiting', 'in_progress', 'finished'], default: 'waiting' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  startedAt: { type: Date },
  endedAt: { type: Date, default: null },
  maxDurationMinutes: { type: Number, default: 10 }
});

module.exports = mongoose.model('Game', gameSchema);
```

```json
{
  "_id": ObjectId,
  "hostUserId": ObjectId,
  "players": [ObjectId],
  "status": "waiting",          // "waiting" | "in_progress" | "finished"
  "maxDurationMinutes": 30,     // maximum allowed duration (optional)
  "winner": ObjectId | null,
  "startedAt": ISODate,
  "endedAt": ISODate | null,
}
```

---

### 4. `gameStates` – Game State

```js
const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  currentPlayerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  direction: { type: Number, enum: [1, -1], default: 1 }, // 1 = saat yönü, -1 = ters
  drawPile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  discardPile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  hands: { 
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    default: {}
  }
});

module.exports = mongoose.model('GameState', gameStateSchema);
```

```json
{
  "_id": ObjectId,
  "gameId": ObjectId,
  "currentPlayerId": ObjectId,
  "direction": 1,                    // 1 = clockwise, -1 = counter-clockwise
  "drawPile": [ObjectId],            // card IDs
  "discardPile": [ObjectId],
  "hands": {
    "userId1": [ObjectId],
    "userId2": [ObjectId]
  }
}
```

---

### 5. `moves` (optional) – Move Logs

```js
const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: false },
  action: { type: String, enum: ['play_card', 'draw_card', 'pass'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Move', moveSchema);
```

```json
{
  "_id": ObjectId,
  "gameId": ObjectId,
  "playerId": ObjectId,
  "cardId": ObjectId,
  "action": "play_card",             // "play_card" | "draw_card" | "pass"
  "timestamp": ISODate
}
```
