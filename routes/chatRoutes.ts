import express, { Router } from 'express'
import { requireAuth } from '@clerk/express';
import fetchAuthenticatedUser from '../middlewares/authMiddleware';
import { accessChat, fetchChat, createGroupChat, renameGroupChat, removefromGroup, addtoGroup } from '../controllers/chatControllers';

const router: Router = Router();

router.post('/', requireAuth(),  accessChat)
router.get('/', requireAuth(), fetchChat)
router.post('/group', requireAuth(), createGroupChat)
router.put('/rename', requireAuth(), renameGroupChat)
router.put('/remove', requireAuth(), removefromGroup)
router.put('/groupadd', requireAuth(), addtoGroup)

export default router