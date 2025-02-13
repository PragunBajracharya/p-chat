import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname + "/../../.env") });


const PORT = process.env.PORT || 5001;
console.log(process.env);

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/../../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "/../../frontend/dist/index.html"));
	});
}

server.listen(PORT, () => {
	console.log("Server is running on port:", PORT);
	connectDB();
});
