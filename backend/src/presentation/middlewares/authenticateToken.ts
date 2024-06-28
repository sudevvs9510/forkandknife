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

const authenticateToken = (requiredRole: 'user' | 'restaurant' | 'admin') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log("No token found");
      return res.sendStatus(401);
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "xyZiopasf89asfaj";
    const { message, decode } = jwtVerifyToken(token, accessTokenSecret);

    if (message === "Invalid Token" || !decode) {
      return res.sendStatus(403);
    }

    if (decode.role !== requiredRole) {
      return res.sendStatus(403);
    }

    // Set the userId and userRole in the request object
    req.userId = decode.userId;
    req.userRole = decode.role;

    next();
  };
};

export default authenticateToken;
