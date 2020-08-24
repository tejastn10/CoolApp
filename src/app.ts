import express, { json, Application, Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";

const app: Application = express();

// * Connect DataBase
connectDB();

// * Init Middleware
app.use(cors());
app.use(json());

app.get("/", (_req: Request, res: Response) => res.send("API Running..."));

// * Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// * Ports
const PORT: string | number = process.env.PORT || 5000;

// ? Log Message
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
