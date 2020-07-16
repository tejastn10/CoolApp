import express, { json, Application, Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";

const app: Application = express();

// * Connect DataBase
connectDB();

app.get("/", (_req: Request, res: Response) => {
  return res.send("API Running...");
});

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
