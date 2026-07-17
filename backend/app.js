const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');  // ✅ added multer
const path = require('path');

// ✅ Models
const Badge = require('./models/Badge');
const Leaderboard = require('./models/Leaderboard');
const Achievement = require('./models/Achievement');
const User = require('./models/User');

// ✅ Routes
const adminRoutes = require('./routes/adminRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const prizeRoutes = require('./routes/prizeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log("Starting server...");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Health check routes (must be before other routes)
app.get('/', (req, res) => {
  res.json({ message: 'Wild Academy API is running', status: 'ok' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Wild Academy API endpoints', endpoints: ['/api/admin/login', '/api/badges', '/api/leaderboard', '/api/achievements'] });
});

// ✅ Routes for admin & applications
app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/prizes', prizeRoutes);

// ✅ Setup multer storage engine for media uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Sample wild animal badges for seeding
const sampleBadges = [
  { name: 'Lion King', description: 'For showing leadership qualities and courage', animal: '🦁 Lion', badgePhoto: '', points: 100, rarity: 'legendary' },
  { name: 'Tiger Strength', description: 'For demonstrating physical strength and determination', animal: '🐯 Tiger', badgePhoto: '', points: 80, rarity: 'epic' },
  { name: 'Bear Hug', description: 'For being kind and supportive to others', animal: '🐻 Bear', badgePhoto: '', points: 50, rarity: 'rare' },
  { name: 'Wolf Pack', description: 'For excellent teamwork and collaboration', animal: '🐺 Wolf', badgePhoto: '', points: 60, rarity: 'rare' },
  { name: 'Fox Smart', description: 'For showing clever problem-solving skills', animal: '🦊 Fox', badgePhoto: '', points: 40, rarity: 'common' },
  { name: 'Elephant Memory', description: 'For excellent memory and learning ability', animal: '🐘 Elephant', badgePhoto: '', points: 70, rarity: 'epic' },
  { name: 'Giraffe Tall', description: 'For reaching high goals and ambitions', animal: '🦒 Giraffe', badgePhoto: '', points: 45, rarity: 'common' },
  { name: 'Zebra Fast', description: 'For quick thinking and fast action', animal: '🦓 Zebra', badgePhoto: '', points: 35, rarity: 'common' },
  { name: 'Rhino Strong', description: 'For showing resilience and strength', animal: '🦏 Rhino', badgePhoto: '', points: 55, rarity: 'rare' },
  { name: 'Eagle Eye', description: 'For excellent attention to detail', animal: '🦅 Eagle', badgePhoto: '', points: 65, rarity: 'epic' },
  { name: 'Owl Wise', description: 'For wisdom and smart decisions', animal: '🦉 Owl', badgePhoto: '', points: 75, rarity: 'legendary' },
  { name: 'Parrot Talk', description: 'For great communication skills', animal: '🦜 Parrot', badgePhoto: '', points: 30, rarity: 'common' },
  { name: 'Flamingo Pink', description: 'For creativity and standing out', animal: '🦩 Flamingo', badgePhoto: '', points: 40, rarity: 'rare' },
  { name: 'Penguin Cool', description: 'For staying calm under pressure', animal: '🐧 Penguin', badgePhoto: '', points: 35, rarity: 'common' },
  { name: 'Shark Brave', description: 'For facing challenges fearlessly', animal: '🦈 Shark', badgePhoto: '', points: 85, rarity: 'legendary' },
  { name: 'Whale Big', description: 'For thinking big and dreaming large', animal: '🐋 Whale', badgePhoto: '', points: 50, rarity: 'rare' },
  { name: 'Dolphin Play', description: 'For bringing joy and fun to activities', animal: '🐬 Dolphin', badgePhoto: '', points: 45, rarity: 'common' },
  { name: 'Octopus Smart', description: 'For multitasking and adaptability', animal: '🐙 Octopus', badgePhoto: '', points: 60, rarity: 'rare' },
  { name: 'Crab Pinch', description: 'For getting things done efficiently', animal: '🦀 Crab', badgePhoto: '', points: 25, rarity: 'common' },
  { name: 'Crocodile Tough', description: 'For overcoming difficult obstacles', animal: '🐊 Crocodile', badgePhoto: '', points: 70, rarity: 'epic' },
  { name: 'Snake Sneaky', description: 'For clever strategies and tactics', animal: '🐍 Snake', badgePhoto: '', points: 40, rarity: 'common' },
  { name: 'Lizard Quick', description: 'For quick reflexes and reactions', animal: '🦎 Lizard', badgePhoto: '', points: 30, rarity: 'common' },
  { name: 'Turtle Steady', description: 'For consistency and persistence', animal: '🐢 Turtle', badgePhoto: '', points: 35, rarity: 'common' },
  { name: 'Dinosaur Roar', description: 'For being bold and confident', animal: '🦖 Dinosaur', badgePhoto: '', points: 90, rarity: 'legendary' },
  { name: 'Butterfly Beautiful', description: 'For personal growth and transformation', animal: '🦋 Butterfly', badgePhoto: '', points: 50, rarity: 'rare' },
  { name: 'Bee Busy', description: 'For hard work and productivity', animal: '🐝 Bee', badgePhoto: '', points: 40, rarity: 'common' },
  { name: 'Ant Team', description: 'For amazing teamwork and cooperation', animal: '🐜 Ant', badgePhoto: '', points: 55, rarity: 'rare' },
  { name: 'Spider Web', description: 'For creating connections and networks', animal: '🕷️ Spider', badgePhoto: '', points: 45, rarity: 'common' },
  { name: 'Buffalo Strong', description: 'For raw strength and power', animal: '🐃 Buffalo', badgePhoto: '', points: 60, rarity: 'rare' }
];

// Seed database function
async function seedDatabase() {
  try {
    const badgeCount = await Badge.countDocuments();
    
    if (badgeCount === 0) {
      console.log('🏆 Seeding badges...');
      await Badge.insertMany(sampleBadges);
      console.log(`✅ Inserted ${sampleBadges.length} badges`);
    } else {
      console.log(`✅ Badges already exist (${badgeCount} found)`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// ✅ Upload route for media
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Use the API URL from environment or construct from request
  const apiBaseUrl = process.env.API_URL || `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${apiBaseUrl}/uploads/${req.file.filename}`;
  res.json({ message: 'Upload successful', fileUrl });
});

// ✅ MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/wild_academy';

console.log('Attempting to connect to MongoDB...');
console.log('Connection URI:', mongoUri.replace(/:([^:@]+)@/, ':****@')); // Hide password

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 20000,
  connectTimeoutMS: 20000,
  socketTimeoutMS: 20000,
})
.then(async () => {
  console.log("✅ MongoDB Connected");

  // Seed database after successful connection
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:");
  console.error(err);
  console.error("💡 Trying local MongoDB fallback...");
  
  // Fallback to local MongoDB
  mongoose.connect('mongodb://localhost:27017/wild_academy')
    .then(async () => {
      console.log('✅ Connected to local MongoDB');
      await seedDatabase();
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch(localErr => {
      console.error('❌ Local MongoDB connection failed:', localErr.message);
      console.error('💡 Make sure MongoDB is running locally or check your network connection for MongoDB Atlas');
    });
});