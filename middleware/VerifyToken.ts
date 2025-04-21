import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.get("Authorization");
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(403).json({ status: "Authorization header is required" });
    }
  
    const token = authorization.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ status: "Token not provided" });
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.KEY_TOKEN as string);
      req.body.id = decoded.data.id;
      next();
    } catch (error) {
      return res.status(403).json({ status: "Unauthorized" });
    }
  };
  
  export default verifyToken;
  