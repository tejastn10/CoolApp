import express, { json } from "express";
import cors from "cors";

require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send("API Running..."));

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
