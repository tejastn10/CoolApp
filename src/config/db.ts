import { connect } from "mongoose";

require("dotenv").config({ path: "src/config/.env" });

const URI: string = process.env["URI"]!; // ?Type fixed with exclamation mark

export const connectDB = async () => {
  try {
    await connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // !Exit process with failure
  }
};
