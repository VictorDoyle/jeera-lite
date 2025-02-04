import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { UserCreateInput, UserLoginInput } from '../models/user.model';

class UserController {
    public register = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const userExists = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (userExists.rows.length > 0) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await pool.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
                [email, hashedPassword]
            );

            const user = result.rows[0];
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret'
            );

            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user' });
        }
    };

    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            const user = result.rows[0];

            if (!user || !(await bcrypt.compare(password, user.password_hash))) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret'
            );

            res.json({ user: { id: user.id, email: user.email }, token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    };
}

export default new UserController();