import { Response } from "express";

export const LogErr = (err: Error, res: Response) => {
  console.error(err.message);
  res.status(500).send("Server Error!");
};
