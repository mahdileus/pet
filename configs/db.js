// configs/db.js
import mongoose from "mongoose";

export async function connectToDB() {
  try {
    // اگر اتصال برقرار است، دوباره وصل نشو
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "yourDbName", // اگر داری اضافه کن
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Error connecting to MongoDB");
  }
}
