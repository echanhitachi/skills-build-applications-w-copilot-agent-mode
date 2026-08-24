"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const codespaceName = process.env.CODESPACE_NAME;
const port = 8000;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const frontendBaseUrl = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: frontendBaseUrl }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.listen(port, () => {
    console.log(`OctoFit backend running on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
