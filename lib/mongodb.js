import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing DB connection'); // Log if using cached connection
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Add these options for better connection stability, though not strictly necessary for simple connection
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB Connected!'); // Log successful new connection
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error); // Log connection errors
      throw error; // Re-throw to propagate the error
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;