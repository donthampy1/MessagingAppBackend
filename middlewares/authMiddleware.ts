import { clerkClient, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();


declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string }
      user?: any
    }
  }
}


const fetchAuthenticatedUser = async ( req: Request, res: Response, next: NextFunction ): Promise<any> =>{
  try {
    if (!req.auth || !req.auth.userId) {
        return res.status(400)
    } 
    const { userId } = req.auth
    const user = await clerkClient.users.getUser(userId)
    req.user = user
    console.log('reaching', user)
    next();
  } catch (error) {
    console.error('Error fetching user at fetch authenticated user:', error)
    res.status(500).json({ error: 'Failed to fetch user details' })
  }
}

export default fetchAuthenticatedUser;
