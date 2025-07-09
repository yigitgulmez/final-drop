## 📁 MongoDB Koleksiyon Yapısı – UNO Kart Oyunu

> 𝙏𝙍 / [𝙀𝙉](./EN.md)

---

## 🔧 MongoDB Kurulumu

Tüm şemaları oluşturup test verilerini eklemek için:

```bash
node createDB.js
```

---

### 1. `users` – Kullanıcılar

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

### 2. `cards` – Kartlar (Statik Veri)

```json
{
  "_id": ObjectId,
  "type": "number",              // "number" | "skip" | "reverse" | "draw_two" | "wild" | "wild_draw_four"
  "color": "red",                // "red" | "green" | "blue" | "yellow" | null
  "value": 3                     // 0–9 | null
}
```

---

### 3. `games` – Oyunlar

```json
{
  "_id": ObjectId,
  "hostUserId": ObjectId,
  "players": [ObjectId],
  "status": "waiting",          // "waiting" | "in_progress" | "finished"
  "maxDurationMinutes": 10,     // number (minute) | null
  "winner": ObjectId | null,
  "startedAt": ISODate,
  "endedAt": ISODate | null
}
```

---

### 4. `gameStates` – Oyun Durumu

```json
{
  "_id": ObjectId,
  "gameId": ObjectId,
  "currentPlayerId": ObjectId,
  "direction": 1,                    // 1 = saat yönü, -1 = ters
  "drawPile": [ObjectId],            // kart id’leri
  "discardPile": [ObjectId],
  "hands": {
    "userId1": [ObjectId],
    "userId2": [ObjectId]
  }
}
```

---

### 5. `moves` – Hamle Logları

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
