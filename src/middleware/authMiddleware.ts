import type {
  Request,
  Response,
  NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

const SECRET_KEY = 'RAHASIA_NEGARA';

interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token tidak ditemukan'
    });
  }

  jwt.verify(
    token,
    SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Token tidak valid'
        });
      }

      req.user = decoded as JwtPayload;

      next();
    }
  );
}