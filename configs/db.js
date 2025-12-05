// configs/db.js
import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
