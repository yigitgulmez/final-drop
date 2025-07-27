## 📁 MongoDB Collection Structure – UNO Card Game

> [𝙏𝙍](./TR.md) / 𝙀𝙉

---

## 🔧 Initial MongoDB Setup

To create all schemas and seed test data, run:

```bash
node createDB.js
```

---

### 1. `users` – Users

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

```json
{
  "_id": ObjectId,
  "hostUserId": ObjectId,
  "players": [ObjectId],
  "status": "waiting",          // "waiting" | "in_progress" | "finished"
  "maxDurationMinutes": 10,     // number (dakika) | null
  "winner": ObjectId | null,
  "startedAt": ISODate,
  "endedAt": ISODate | null,
}
```

---

### 4. `gameStates` – Game State

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

### 5. `moves` – Move Logs

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
