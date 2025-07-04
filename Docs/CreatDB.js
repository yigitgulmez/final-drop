const mongoose = require('mongoose');

// --- User Schema ---
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// --- Card Schema ---
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
const Card = mongoose.model('Card', cardSchema);

// --- Game Schema ---
const gameSchema = new mongoose.Schema({
  hostUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['waiting', 'in_progress', 'finished'], default: 'waiting' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  startedAt: { type: Date },
  endedAt: { type: Date, default: null },
  maxDurationMinutes: { type: Number, default: 10 }
});
const Game = mongoose.model('Game', gameSchema);

// --- GameState Schema ---
const gameStateSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  currentPlayerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  direction: { type: Number, enum: [1, -1], default: 1 },
  drawPile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  discardPile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  hands: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    default: {}
  }
});
const GameState = mongoose.model('GameState', gameStateSchema);

// --- Move Schema ---
const moveSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  action: { type: String, enum: ['play_card', 'draw_card', 'pass'], required: true },
  timestamp: { type: Date, default: Date.now }
});
const Move = mongoose.model('Move', moveSchema);

// --- Cread Card Data ---
const colors = ['red', 'green', 'blue', 'yellow'];
const cardData = [];

colors.forEach(color => {
  cardData.push({ type: 'number', color, value: 0 });
  for (let i = 1; i <= 9; i++) {
    cardData.push({ type: 'number', color, value: i });
    cardData.push({ type: 'number', color, value: i });
  }

  for (let i = 0; i < 2; i++) {
    cardData.push({ type: 'skip', color, value: null });
    cardData.push({ type: 'reverse', color, value: null });
    cardData.push({ type: 'draw_two', color, value: null });
  }
});

for (let i = 0; i < 4; i++) {
  cardData.push({ type: 'wild', color: null, value: null });
  cardData.push({ type: 'wild_draw_four', color: null, value: null });
}

// --- Seed Funciton ---
async function seedAll() {
  try {
    await mongoose.connect('mongodb://localhost:27017/uno', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB bağlantısı başarılı.');

    // Add the cards
    const cardCount = await Card.countDocuments();
    if (cardCount === 0) {
      await Card.insertMany(cardData);
      console.log('✅ Kartlar eklendi.');
    } else {
      console.log('ℹ️  Kartlar zaten var.');
    }

    // Test user and data
    const admin = await User.findOne({ nickname: 'admin' });
    if (!admin) {
      const newAdmin = await User.create({
        email: 'admin@example.com',
        nickname: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        passwordHash: 'test123'
      });

      const game = await Game.create({
        hostUserId: newAdmin._id,
        players: [newAdmin._id],
        status: 'waiting',
        startedAt: new Date(),
        maxDurationMinutes: 10
      });

      const gameState = await GameState.create({
        gameId: game._id,
        currentPlayerId: newAdmin._id,
        direction: 1,
        drawPile: [],
        discardPile: [],
        hands: {
          [newAdmin._id.toString()]: []
        }
      });

      await Move.create({
        gameId: game._id,
        playerId: newAdmin._id,
        cardId: null,
        action: 'pass',
        timestamp: new Date()
      });

      console.log('✅ Test kullanıcı ve örnek oyun oluşturuldu.');
    } else {
      console.log('ℹ️  Test verisi zaten var.');
    }

    console.log('✅ Tüm veriler başarıyla yüklendi.');
  } catch (err) {
    console.error('❌ Hata:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı.');
  }
}

if (require.main === module) {
  seedAll();
}

module.exports = {
  User,
  Card,
  Game,
  GameState,
  Move
};
