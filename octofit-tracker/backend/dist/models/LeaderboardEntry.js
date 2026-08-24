"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
