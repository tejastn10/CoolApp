import express, { json, Application, Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";

const app: Application = express();

// * Connect DataBase
connectDB();

app.get("/", (req: Request, res: Response) => res.send("API Running..."));

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
