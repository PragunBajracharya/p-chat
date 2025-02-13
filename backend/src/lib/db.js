import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not defined in environment variables.");
		}

		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false, // Disable buffering to prevent hanging queries
			maxPoolSize: 10, // Connection pooling to prevent excessive new connections
		});

		mongoose.set("debug", process.env.NODE_ENV === "development"); // Enable debug only in development

		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`ongoDB connection error: ${error.message}`);
	}
};
