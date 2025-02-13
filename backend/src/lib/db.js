import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			bufferCommands: false, // Disable buffering
		});
		mongoose.set("debug", true);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};
