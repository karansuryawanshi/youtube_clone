// testMongo.js
import mongoose from "mongoose";

const uri =
  "mongodb+srv://karansuryawanshi:GAo1PH0hLmCeqTSy@cluster0.powpyib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));
