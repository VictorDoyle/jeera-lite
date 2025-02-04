import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// extend express req to include user info
declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string };
        }
    }
}

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // BEARER token

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as { id: string; email: string };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}