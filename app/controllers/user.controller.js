import User from "../models/user.model.js";
import Content from "../models/content.model.js";

export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Cái này là Cường làm nè!");
};

export const viewContent = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to set req.userId
    const contentId = req.params.contentId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).send({ message: "Content not found" });
    }

    if (!user.viewedContent.includes(contentId)) {
      user.viewedContent.push(contentId);
      await user.save();
    }

    res.status(200).send({ message: "Content viewed successfully" });
  } catch (err) {
    console.error("Error during viewing content:", err);
    res.status(500).send({ message: err.message });
  }
};
