import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({ status: "Se necesita el Header" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: "No ha ingresado el token" });
  }

  try {
    const secret_key = "your-secret-key";
    const decoded: any = jwt.verify(token, secret_key);
    req.body.id = decoded;
    next();
  } catch (error) {
    console.log(error);

    return res.status(403).json({ status: "Sin acceso" });
  }
};
