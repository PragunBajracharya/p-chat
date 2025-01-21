export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUser = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUser } });

		res.status(200).json(filteredUsers);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getMessage = async (req, res) => {
	try {
        const { id:userToChatId } = req.params;
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: loggedInUserId },
            ],
        });

        res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}