import { Request, Response, NextFunction } from 'express';
import { jwtVerifyToken } from '../../functions/jwt';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: 'user' | 'restaurant' | 'admin';
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
  role: 'user' | 'restaurant' | 'admin';
}

const authenticateToken = (requiredRole: 'user' | 'restaurant' | 'admin') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: 'No token provided' });
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "xyZiopasf89asfaj";
    const { message, decode } = jwtVerifyToken(token, accessTokenSecret);

    if (message === "Invalid Token" || !decode) {
      console.log("Invalid token");
      return res.status(403).json({ message: 'Invalid token' });
    }

    const decoded = decode as DecodedToken;

    if (decode.role !== requiredRole) {
      console.log(`Role mismatch: required ${requiredRole}, got ${decoded.role}`);
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }


    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  };
};

export default authenticateToken;
