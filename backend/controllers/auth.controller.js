import { generateToken } from "../lib/utils,js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
	const { email, fullName, password } = req.body;
	try {
		if (!email || !fullName || !password) {
			return res
				.status(400)
				.json({ message: "Please fill in all fields" });
		}
		if (password.length < 6) {
			return res.status(400).json({
				message: "Password must be at least 6 characters long",
			});
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			fullName,
			password: hashedPassword,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				email: newUser.email,
				fullName: newUser.fullName,
				profilePic: newUser.profilePic,
				message: "User created successfully",
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Please fill in all fields" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		generateToken(user._id, res);

		res.status(200).json({
			_id: user._id,
			email: user.email,
			fullName: user.fullName,
			profilePic: user.profilePic,
			message: "Login successful",
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.clearCookie("jwt");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userId = req.user._id;

		if (!profilePic) {
			return res
				.status(400)
				.json({ message: "Please provide a profile picture" });
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePic);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePic: uploadResponse.secure_url },
			{ new: true }
		);

		res.status(200).json({
			...updatedUser,
			message: "Profile updated successfully",
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
