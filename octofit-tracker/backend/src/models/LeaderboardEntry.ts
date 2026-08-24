import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export default model('LeaderboardEntry', leaderboardEntrySchema);
