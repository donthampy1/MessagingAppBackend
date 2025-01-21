import { Router } from 'express'
import { requireAuth } from '@clerk/express';
import { aiChat } from '../controllers/aichatController';

const router: Router = Router();

router.post('/', requireAuth(), aiChat)


export default router