
import { Router } from 'express';
import { createClip, getClip } from '../controllers/clip-controller.js';

const router = Router();

router.post('/clips', createClip);
router.get('/clips/:pin', getClip);

export default router;
