import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/.env" });

const URI: string = process.env["URI"]!; // ?Type fixed with exclamation mark

export const connectDB = async () => {
  try {
    await connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // !Exit process with failure
  }
};
