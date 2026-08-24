import cors from 'cors';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const codespaceName = process.env.CODESPACE_NAME;

const port = 8000;

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const frontendBaseUrl = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

const app = express();

app.use(cors({ origin: frontendBaseUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit backend running on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
