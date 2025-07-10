import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
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


// mongodb+srv://<db_username>:<db_password>@cluster0.di8bch4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0