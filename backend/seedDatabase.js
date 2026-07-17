const mongoose = require('mongoose');
const Badge = require('./models/Badge');
const Leaderboard = require('./models/Leaderboard');
const Achievement = require('./models/Achievement');
const User = require('./models/User');

require('dotenv').config();

// Sample wild animal badges
const sampleBadges = [
  {
    name: 'Lion King',
    description: 'For showing leadership qualities and courage',
    animal: '🦁 Lion',
    badgePhoto: '',
    points: 100,
    rarity: 'legendary'
  },
  {
    name: 'Tiger Strength',
    description: 'For demonstrating physical strength and determination',
    animal: '🐯 Tiger',
    badgePhoto: '',
    points: 80,
    rarity: 'epic'
  },
  {
    name: 'Bear Hug',
    description: 'For being kind and supportive to others',
    animal: '🐻 Bear',
    badgePhoto: '',
    points: 50,
    rarity: 'rare'
  },
  {
    name: 'Wolf Pack',
    description: 'For excellent teamwork and collaboration',
    animal: '🐺 Wolf',
    badgePhoto: '',
    points: 60,
    rarity: 'rare'
  },
  {
    name: 'Fox Smart',
    description: 'For showing clever problem-solving skills',
    animal: '🦊 Fox',
    badgePhoto: '',
    points: 40,
    rarity: 'common'
  },
  {
    name: 'Elephant Memory',
    description: 'For excellent memory and learning ability',
    animal: '🐘 Elephant',
    badgePhoto: '',
    points: 70,
    rarity: 'epic'
  },
  {
    name: 'Giraffe Tall',
    description: 'For reaching high goals and ambitions',
    animal: '🦒 Giraffe',
    badgePhoto: '',
    points: 45,
    rarity: 'common'
  },
  {
    name: 'Zebra Fast',
    description: 'For quick thinking and fast action',
    animal: '🦓 Zebra',
    badgePhoto: '',
    points: 35,
    rarity: 'common'
  },
  {
    name: 'Rhino Strong',
    description: 'For showing resilience and strength',
    animal: '🦏 Rhino',
    badgePhoto: '',
    points: 55,
    rarity: 'rare'
  },
  {
    name: 'Eagle Eye',
    description: 'For excellent attention to detail',
    animal: '🦅 Eagle',
    badgePhoto: '',
    points: 65,
    rarity: 'epic'
  },
  {
    name: 'Owl Wise',
    description: 'For wisdom and smart decisions',
    animal: '🦉 Owl',
    badgePhoto: '',
    points: 75,
    rarity: 'legendary'
  },
  {
    name: 'Parrot Talk',
    description: 'For great communication skills',
    animal: '🦜 Parrot',
    badgePhoto: '',
    points: 30,
    rarity: 'common'
  },
  {
    name: 'Flamingo Pink',
    description: 'For creativity and standing out',
    animal: '🦩 Flamingo',
    badgePhoto: '',
    points: 40,
    rarity: 'rare'
  },
  {
    name: 'Penguin Cool',
    description: 'For staying calm under pressure',
    animal: '🐧 Penguin',
    badgePhoto: '',
    points: 35,
    rarity: 'common'
  },
  {
    name: 'Shark Brave',
    description: 'For facing challenges fearlessly',
    animal: '🦈 Shark',
    badgePhoto: '',
    points: 85,
    rarity: 'legendary'
  },
  {
    name: 'Whale Big',
    description: 'For thinking big and dreaming large',
    animal: '🐋 Whale',
    badgePhoto: '',
    points: 50,
    rarity: 'rare'
  },
  {
    name: 'Dolphin Play',
    description: 'For bringing joy and fun to activities',
    animal: '🐬 Dolphin',
    badgePhoto: '',
    points: 45,
    rarity: 'common'
  },
  {
    name: 'Octopus Smart',
    description: 'For multitasking and adaptability',
    animal: '🐙 Octopus',
    badgePhoto: '',
    points: 60,
    rarity: 'rare'
  },
  {
    name: 'Crab Pinch',
    description: 'For getting things done efficiently',
    animal: '🦀 Crab',
    badgePhoto: '',
    points: 25,
    rarity: 'common'
  },
  {
    name: 'Crocodile Tough',
    description: 'For overcoming difficult obstacles',
    animal: '🐊 Crocodile',
    badgePhoto: '',
    points: 70,
    rarity: 'epic'
  },
  {
    name: 'Snake Sneaky',
    description: 'For clever strategies and tactics',
    animal: '🐍 Snake',
    badgePhoto: '',
    points: 40,
    rarity: 'common'
  },
  {
    name: 'Lizard Quick',
    description: 'For quick reflexes and reactions',
    animal: '🦎 Lizard',
    badgePhoto: '',
    points: 30,
    rarity: 'common'
  },
  {
    name: 'Turtle Steady',
    description: 'For consistency and persistence',
    animal: '🐢 Turtle',
    badgePhoto: '',
    points: 35,
    rarity: 'common'
  },
  {
    name: 'Dinosaur Roar',
    description: 'For being bold and confident',
    animal: '🦖 Dinosaur',
    badgePhoto: '',
    points: 90,
    rarity: 'legendary'
  },
  {
    name: 'Butterfly Beautiful',
    description: 'For personal growth and transformation',
    animal: '🦋 Butterfly',
    badgePhoto: '',
    points: 50,
    rarity: 'rare'
  },
  {
    name: 'Bee Busy',
    description: 'For hard work and productivity',
    animal: '🐝 Bee',
    badgePhoto: '',
    points: 40,
    rarity: 'common'
  },
  {
    name: 'Ant Team',
    description: 'For amazing teamwork and cooperation',
    animal: '🐜 Ant',
    badgePhoto: '',
    points: 55,
    rarity: 'rare'
  },
  {
    name: 'Spider Web',
    description: 'For creating connections and networks',
    animal: '🕷️ Spider',
    badgePhoto: '',
    points: 45,
    rarity: 'common'
  },
  {
    name: 'Buffalo Strong',
    description: 'For raw strength and power',
    animal: '🐃 Buffalo',
    badgePhoto: '',
    points: 60,
    rarity: 'rare'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wild_academy');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Badge.deleteMany({});
    await Leaderboard.deleteMany({});
    await Achievement.deleteMany({});
    console.log('✅ Data cleared');

    // Insert badges
    console.log('🏆 Inserting badges...');
    const insertedBadges = await Badge.insertMany(sampleBadges);
    console.log(`✅ Inserted ${insertedBadges.length} badges`);

    // Get existing users for leaderboard
    const users = await User.find({});
    console.log(`👥 Found ${users.length} users`);

    if (users.length > 0) {
      // Create sample leaderboard entries
      console.log('📊 Creating leaderboard entries...');
      const leaderboardEntries = [];
      
      users.slice(0, 10).forEach((user, index) => {
        const points = Math.max(0, 500 - (index * 30) + Math.floor(Math.random() * 50));
        leaderboardEntries.push({
          username: user.username,
          branch: user.branch,
          ageGroup: user.ageGroup,
          points: points,
          rank: index + 1
        });
      });

      await Leaderboard.insertMany(leaderboardEntries);
      console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

      // Create sample achievements
      console.log('🎖️  Creating achievements...');
      const achievements = [];
      
      users.slice(0, 5).forEach(user => {
        const randomBadges = insertedBadges.sort(() => 0.5 - Math.random()).slice(0, 3);
        randomBadges.forEach(badge => {
          achievements.push({
            username: user.username,
            branch: user.branch,
            ageGroup: user.ageGroup,
            title: badge.name,
            description: badge.description,
            icon: badge.animal,
            badgePhoto: badge.badgePhoto,
            points: badge.points,
            dateEarned: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          });
        });
      });

      await Achievement.insertMany(achievements);
      console.log(`✅ Created ${achievements.length} achievements`);
    } else {
      console.log('⚠️  No users found. Create users first to generate leaderboard and achievements.');
    }

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
