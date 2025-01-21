import express, { Router } from 'express'
import { requireAuth } from '@clerk/express';
import { sendMessage, allMessage } from '../controllers/messageControllers';

const router: Router = Router();


router.post('/:chatId', requireAuth(),  sendMessage)
router.get('/:chatId', requireAuth(), allMessage)


export default router