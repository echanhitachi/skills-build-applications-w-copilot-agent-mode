import cors from 'cors';
import express from 'express';
import './config/database';
import { apiBaseUrl, frontendBaseUrl, port } from './config/urls';
import activitiesRouter from './routes/activities';
import usersRouter from './routes/users';

const app = express();

app.use(cors({ origin: frontendBaseUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`OctoFit backend running on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
