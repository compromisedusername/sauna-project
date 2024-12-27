import jwt from 'jsonwebtoken';
import { User } from '../entities/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export function generateToken(user: User): string {
    const payload = {
        userId: user.id,
        role: user.role?.name,
        email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}