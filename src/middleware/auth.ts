import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export interface IUser extends Request {
  user: string; // or any other type
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get toke from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No Token! Authorization denied" });
  }

  // Verify the token
  try {
    const decoded = <IUser>verify(token, process.env["jwtSecret"]!);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token Invalid!" });
  }
};

export default auth;
