import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Thompson', email: 'ava.thompson@octofit.com' },
      { name: 'Noah Kim', email: 'noah.kim@octofit.com' },
      { name: 'Maria Garcia', email: 'maria.garcia@octofit.com' },
      { name: 'Liam Chen', email: 'liam.chen@octofit.com' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Fitness Fanatics', members: [users[0]._id, users[1]._id] },
      { name: 'Cardio Crushers', members: [users[2]._id, users[3]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 300 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400 },
      { user: users[2]._id, type: 'Swimming', durationMinutes: 60, caloriesBurned: 500 },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 40, caloriesBurned: 150 },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 300 },
      { user: users[1]._id, team: teams[0]._id, points: 400 },
      { user: users[2]._id, team: teams[1]._id, points: 500 },
      { user: users[3]._id, team: teams[1]._id, points: 150 },
    ]);

    await Workout.insertMany([
      { name: 'Couch to 5K', description: 'Beginner-friendly running plan.', difficulty: 'beginner' },
      { name: 'HIIT Blast', description: 'High-intensity interval training circuit.', difficulty: 'intermediate' },
      { name: 'Full-Body Strength', description: 'Advanced strength and conditioning routine.', difficulty: 'advanced' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

