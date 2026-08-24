import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

export default router;
