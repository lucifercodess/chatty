import cloudinary from "../config/cloudinary.config.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res
      .status(200)
      .json({ code: 1, msg: "fetched users", users: filteredUsers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 0, msg: "error in getUserForSidebar controller" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: userToChat } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, recieverId: userToChat },
        { senderId: userToChat, recieverId: userId },
      ],
    });
    return res
      .status(200)
      .json({ code: 1, msg: "fetched messages", messages: messages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 0, msg: "error in getMessages controller" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
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
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
