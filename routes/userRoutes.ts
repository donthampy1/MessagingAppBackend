import express, { Router } from 'express'
import { login, searchUsers } from '../controllers/userControllers'
import { requireAuth } from '@clerk/express';

const router: Router = Router();

router.post('/login', login)
router.get('/search', requireAuth(), searchUsers)

export default router 

