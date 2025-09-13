import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { users } from './tvshow.data';

// Secret key for JWT signing - in a real app, this would be in environment variables
const JWT_SECRET = 'tv-shows-api-secret-key';

export interface AuthRequest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

export function generateToken(username: string, role: string): string {
  return jwt.sign({ username, role }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user.username, user.role);
  res.json({ token, username: user.username, role: user.role });
}
