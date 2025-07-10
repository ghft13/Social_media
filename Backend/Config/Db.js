import mongoose from 'mongoose';



const connectDb = async () => {

  const mongoUrl = process.env.MONGO_ATLAS_URL || process.env.MONGO_URL;

  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDb;

